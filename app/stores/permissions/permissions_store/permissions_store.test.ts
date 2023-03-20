import { PermissionsStore } from '@stores/permissions/permissions_store/permissions_store'
import { IPermissionsStore } from '@stores/permissions/permissions_store/permissions_store.types'
import { unprotect } from 'mobx-state-tree'

describe('PermissionsStore', () => {
  it('Defines properties and defaults', () => {
    const permissionsStore = PermissionsStore.create({})

    expect(permissionsStore.permissionGroups).toBeDefined()

    expect(permissionsStore.permissionGroupsList).toHaveLength(0)
  })

  describe('#initialize', () => {
    describe('android device <= os 11', () => {
      it('with correct permission groups', () => {
        const permissionsStore = PermissionsStore.create({}, { IS_ANDROID_DEVICE: true, PLATFORM_VERSION: 30 })
        permissionsStore.initialize()

        expect(permissionsStore.permissionGroupsList).toHaveLength(1)
        expect(permissionsStore.blePermissionGroup).toBeUndefined()
        expect(permissionsStore.locationPermissionGroup).toBeDefined()

        expect(permissionsStore.isForegroundReactionDisposer).toBeDefined()
      })
    })

    describe('android device > os 11', () => {
      it('with correct permission groups', () => {
        const permissionsStore = PermissionsStore.create({}, { IS_ANDROID_DEVICE: true })
        permissionsStore.initialize()

        expect(permissionsStore.permissionGroupsList).toHaveLength(2)
        expect(permissionsStore.blePermissionGroup).toBeDefined()
        expect(permissionsStore.locationPermissionGroup).toBeDefined()

        expect(permissionsStore.isForegroundReactionDisposer).toBeDefined()
      })
    })
  })

  describe('ios device <= 12 os version', () => {
    it('with correct permission groups', () => {
      const permissionsStore = PermissionsStore.create({}, { IS_IOS_DEVICE: true, PLATFORM_VERSION: 11 })
      permissionsStore.initialize()

      expect(permissionsStore.permissionGroupsList).toHaveLength(1)
      expect(permissionsStore.blePermissionGroup).toBeUndefined()
      expect(permissionsStore.locationPermissionGroup).toBeDefined()

      expect(permissionsStore.isForegroundReactionDisposer).toBeDefined()
    })
  })

  describe('ios device > 12 os version', () => {
    it('with correct permission groups', () => {
      const permissionsStore = PermissionsStore.create({}, { IS_IOS_DEVICE: true, PLATFORM_VERSION: 14 })
      permissionsStore.initialize()

      expect(permissionsStore.permissionGroupsList).toHaveLength(2)
      expect(permissionsStore.blePermissionGroup).toBeDefined()
      expect(permissionsStore.locationPermissionGroup).toBeDefined()

      expect(permissionsStore.isForegroundReactionDisposer).toBeDefined()
    })
  })

  describe('#reset', () => {
    let permissionsStore: IPermissionsStore

    beforeAll(() => {
      permissionsStore = PermissionsStore.create({}, { IS_IOS_DEVICE: true, PLATFORM_VERSION: 14 })
      permissionsStore.initialize()
    })

    it('restores to defaults', () => {
      unprotect(permissionsStore)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const isForegroundReactionDisposer = jest.spyOn(permissionsStore, 'isForegroundReactionDisposer')
      permissionsStore.reset()
      expect(isForegroundReactionDisposer).toHaveBeenCalled()
      expect(permissionsStore.permissionGroupsList).toHaveLength(0)
    })
  })
})
