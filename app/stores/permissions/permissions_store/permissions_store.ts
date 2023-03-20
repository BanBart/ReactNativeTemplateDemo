import { getRoot, types, flow, getEnv } from 'mobx-state-tree'
import { IReactionDisposer, reaction } from 'mobx'
import { forOwn } from 'lodash'
import { PERMISSIONS, Permission as TPermission } from 'react-native-permissions'
import { IAppStore } from '@stores/app_store/app_store.types'
import { TEnvironment } from '@services/environment/environment.types'
import { PermissionGroup } from '@models/permissions/permission_group/permission_group'
import { IPermissionGroup, PermissionGroupEnum } from '@models/permissions/permission_group/permission_group.types'

const PermissionsStore = types
  .model('PermissionsStore', {
    permissionGroups: types.optional(types.map(PermissionGroup), {}),
    cameraRollPermissionGroup: types.optional(PermissionGroup, {
      id: PermissionGroupEnum.CAMERA_ROLL,
    }),
  })
  .views((self) => {
    const { IS_ANDROID_DEVICE, IS_IOS_DEVICE, PLATFORM_VERSION } = getEnv<TEnvironment>(self)

    return {
      get CURRENT_PLATFORM_PERMISSION_GROUPS() {
        if (IS_IOS_DEVICE && PLATFORM_VERSION <= 12)
          return {
            [PermissionGroupEnum.LOCATION]: [PERMISSIONS.IOS.LOCATION_WHEN_IN_USE],
          }

        if (IS_IOS_DEVICE)
          return {
            [PermissionGroupEnum.LOCATION]: [PERMISSIONS.IOS.LOCATION_WHEN_IN_USE],
            [PermissionGroupEnum.BLE]: [PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL],
          }

        if (IS_ANDROID_DEVICE && PLATFORM_VERSION <= 30)
          return {
            [PermissionGroupEnum.LOCATION]: [PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION],
          }

        if (IS_ANDROID_DEVICE)
          return {
            [PermissionGroupEnum.LOCATION]: [PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION],
            [PermissionGroupEnum.BLE]: [PERMISSIONS.ANDROID.BLUETOOTH_SCAN, PERMISSIONS.ANDROID.BLUETOOTH_CONNECT],
          }

        return []
      },
      get CURRENT_PLATFORM_CAMERA_ROLL_PERMISSIONS(): TPermission[] {
        if (IS_IOS_DEVICE) return [PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY]

        if (IS_ANDROID_DEVICE && PLATFORM_VERSION >= 33)
          return [
            PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
            PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
            PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
          ]

        if (IS_ANDROID_DEVICE)
          return [PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE]

        return []
      },
    }
  })
  .views((self) => {
    return {
      get permissionGroupsList(): IPermissionGroup[] {
        return [...self.permissionGroups.values()]
      },
      getPermissionGroupById(id: string): IPermissionGroup | undefined {
        return self.permissionGroups.get(id)
      },
    }
  })
  .views((self) => {
    return {
      get areAllPermissionsGranted(): boolean {
        return self.permissionGroupsList.every(({ isGranted }) => isGranted)
      },
      get blePermissionGroup(): IPermissionGroup | undefined {
        return self.getPermissionGroupById(PermissionGroupEnum.BLE)
      },
      get locationPermissionGroup(): IPermissionGroup | undefined {
        return self.getPermissionGroupById(PermissionGroupEnum.LOCATION)
      },
    }
  })
  .views((self) => {
    return {
      get isBlePermissionGranted(): boolean {
        if (!self.blePermissionGroup) return true

        return self.blePermissionGroup.isGranted
      },
    }
  })
  .volatile<{ isForegroundReactionDisposer: IReactionDisposer | undefined }>(() => {
    return {
      isForegroundReactionDisposer: undefined,
    }
  })
  .actions((self) => {
    return {
      addPermissionGroup(id: PermissionGroupEnum, permissions: TPermission[]): void {
        self.permissionGroups.set(id, {
          id,
        })

        const permissionGroup = self.getPermissionGroupById(id)

        permissions.map((permissionId: TPermission) => permissionGroup?.addPermission(permissionId))
      },
    }
  })
  .actions((self) => {
    return {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      checkPermissions: flow(function* checkPermissions() {
        yield Promise.all(self.permissionGroupsList.map((permissionGroup) => permissionGroup.checkPermissions()))
        yield self.cameraRollPermissionGroup.checkPermissions()
      }),
    }
  })
  .actions((self) => {
    return {
      initializePermissionGroups(): void {
        forOwn(self.CURRENT_PLATFORM_PERMISSION_GROUPS, (permissions, id) =>
          self.addPermissionGroup(id as PermissionGroupEnum, permissions),
        )
      },
      initializeCameraRollPermission(): void {
        self.CURRENT_PLATFORM_CAMERA_ROLL_PERMISSIONS.map((permissionId: TPermission) =>
          self.cameraRollPermissionGroup.addPermission(permissionId),
        )
      },
      initializeIsForegroundReactor(): void {
        if (self.isForegroundReactionDisposer) self.isForegroundReactionDisposer()

        self.isForegroundReactionDisposer = reaction(
          () => getRoot<IAppStore>(self).isForeground,
          async (isForeground) => {
            if (isForeground) await self.checkPermissions()
          },
          { fireImmediately: true },
        )
      },
    }
  })
  .actions((self) => {
    return {
      initialize(): void {
        self.permissionGroups.clear()
        self.initializePermissionGroups()
        self.initializeCameraRollPermission()
        self.initializeIsForegroundReactor()
      },
      reset(): void {
        if (self.isForegroundReactionDisposer) self.isForegroundReactionDisposer()
        self.permissionGroups.clear()
      },
    }
  })

export { PermissionsStore }
