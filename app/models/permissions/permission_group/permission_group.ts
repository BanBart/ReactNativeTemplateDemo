import { types, flow, getRoot } from 'mobx-state-tree'
import {
  PermissionStatus,
  Permission as TPermission,
  checkMultiple,
  requestMultiple,
  openSettings,
  RESULTS,
} from 'react-native-permissions'
import { forOwn } from 'lodash'
import { Permission } from '@models/permissions/permission/permission'
import { PermissionGroupEnum } from '@models/permissions/permission_group/permission_group.types'
import { IPermission } from '@models/permissions/permission/permission.types'
import { IDeviceServiceSettings } from '@models/permissions/device_service_settings/device_service_settings.types'
import { IAppStore } from '@stores/app_store/app_store.types'

const PermissionGroup = types
  .model('PermissionGroup', {
    id: types.identifier,
    permissions: types.optional(types.map(Permission), {}),
  })
  .views((self) => {
    return {
      get permissionsList(): IPermission[] {
        return [...self.permissions.values()]
      },
      get isBlePermissionGroup(): boolean {
        return self.id === PermissionGroupEnum.BLE
      },
      get isLocationPermissionGroup(): boolean {
        return self.id === PermissionGroupEnum.LOCATION
      },
      get isCameraRollPermissionGroup(): boolean {
        return self.id === PermissionGroupEnum.CAMERA_ROLL
      },
      getPermissionById(id: string) {
        return self.permissions.get(id)
      },
    }
  })
  .views((self) => {
    return {
      get permissionsIdentifiers(): TPermission[] {
        return self.permissionsList.map(({ id }) => id) as TPermission[]
      },
      get isBlocked(): boolean {
        return self.permissionsList.some((item) => item.isBlocked)
      },
      get isGranted(): boolean {
        return self.permissionsList.every((item) => item.isGranted)
      },
      get isUnavailable(): boolean {
        return self.permissionsList.some((item) => item.isUnavailable)
      },
      get name(): string {
        if (self.isBlePermissionGroup) return 'Bluetooth permission'

        if (self.isLocationPermissionGroup) return 'Location permission'

        return self.id
      },
      get deviceServicesSettings(): IDeviceServiceSettings | undefined {
        if (self.isLocationPermissionGroup)
          return getRoot<IAppStore>(self).deviceServicesSettingsStore.locationServiceSettings

        if (self.isBlePermissionGroup) return getRoot<IAppStore>(self).deviceServicesSettingsStore.bleServiceSettings

        return undefined
      },
    }
  })
  .actions((self) => {
    return {
      addPermission(id: string, result?: PermissionStatus): void {
        const permission = self.getPermissionById(id)

        if (result === RESULTS.DENIED && permission?.isBlocked) return

        self.permissions.set(id, {
          id,
          result,
        })
      },
    }
  })
  .actions((self) => {
    return {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      requestDeviceServicesSettings: flow(function* requestDeviceServicesSettings() {
        yield self.deviceServicesSettings?.request()
      }),
    }
  })
  .actions((self) => {
    return {
      checkPermissions: flow(function* checkPermissions() {
        const permissionsResponse = yield checkMultiple(self.permissionsIdentifiers)

        forOwn(permissionsResponse, (result: PermissionStatus, id: string) => self.addPermission(id, result))
      }),
      request: flow(function* request() {
        if (self.isBlocked) yield openSettings()
        else if (self.isUnavailable) yield self.requestDeviceServicesSettings()
        else {
          const permissionsResponse = yield requestMultiple(self.permissionsIdentifiers)

          forOwn(permissionsResponse, (result: PermissionStatus, id: string) => self.addPermission(id, result))
        }
      }),
    }
  })

export { PermissionGroup }
