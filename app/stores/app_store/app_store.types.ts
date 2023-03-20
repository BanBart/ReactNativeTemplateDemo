import { Instance, SnapshotIn, SnapshotOut } from 'mobx-state-tree'
import { AppStore } from '@stores/app_store/app_store'

export enum EnumAppState {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  BACKGROUND = 'background',
  UNKNOWN = 'unknown',
  EXTENSION = 'extension',
}

export interface IAppStore extends Instance<typeof AppStore> {}
export interface IAppStoreSnapshotIn extends SnapshotIn<typeof AppStore> {}
export interface IAppStoreSnapshotOut extends SnapshotOut<typeof AppStore> {}
