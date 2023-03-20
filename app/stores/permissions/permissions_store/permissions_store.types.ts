import { Instance, SnapshotIn, SnapshotOut } from 'mobx-state-tree'
import { PermissionsStore } from '@stores/permissions/permissions_store/permissions_store'

export interface IPermissionsStore extends Instance<typeof PermissionsStore> {}
export interface IPermissionsStoreSnapshotIn extends SnapshotIn<typeof PermissionsStore> {}
export interface IPermissionsStoreSnapshotOut extends SnapshotOut<typeof PermissionsStore> {}
