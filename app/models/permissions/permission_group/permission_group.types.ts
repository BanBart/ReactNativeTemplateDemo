import { Instance, SnapshotIn, SnapshotOut } from 'mobx-state-tree'
import { PermissionGroup } from '@models/permissions/permission_group/permission_group'

export enum PermissionGroupEnum {
  BLE = 'BLE',
  LOCATION = 'Location',
  LOCAL_NETWORK = 'Local Network',
  CAMERA_ROLL = 'Camera Roll',
}

export interface IPermissionGroup extends Instance<typeof PermissionGroup> {}
export interface IPermissionGroupSnapshotIn extends SnapshotIn<typeof PermissionGroup> {}
export interface IPPermissionGroupSnapshotOut extends SnapshotOut<typeof PermissionGroup> {}
