import { PermissionGroup } from '@models/permissions/permission_group/permission_group'
import { PermissionGroupEnum } from '@models/permissions/permission_group/permission_group.types'

describe('PermissionGroup', () => {
  it('Defines properties and defaults', () => {
    const permissionGroup = PermissionGroup.create({ id: PermissionGroupEnum.BLE })

    expect(permissionGroup.id).toBeDefined()
    expect(permissionGroup.permissions).toBeDefined()

    expect(permissionGroup.permissionsList).toEqual([])
  })

  describe('#isBlePermissionGroup', () => {
    it('returns true when ble premission group', () => {
      const permissionGroup = PermissionGroup.create({ id: PermissionGroupEnum.BLE })

      expect(permissionGroup.isBlePermissionGroup).toBeTruthy()
    })
  })

  describe('#isLocationPermissionGroup', () => {
    it('returns true when location permission group', () => {
      const permissionGroup = PermissionGroup.create({ id: PermissionGroupEnum.LOCATION })

      expect(permissionGroup.isLocationPermissionGroup).toBeTruthy()
    })
  })
})
