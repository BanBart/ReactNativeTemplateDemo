import { Instance, SnapshotIn, SnapshotOut } from 'mobx-state-tree'
import { Permission } from '@models/permissions/permission/permission'

export interface IPermission extends Instance<typeof Permission> {}
export interface IPermissionSnapshotIn extends SnapshotIn<typeof Permission> {}
export interface IPermissionSnapshotOut extends SnapshotOut<typeof Permission> {}
