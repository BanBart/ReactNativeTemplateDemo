import { onSnapshot } from 'mobx-state-tree'
import { pick } from 'lodash'
import { AppStore } from '@stores/app_store/app_store'
import { IAppStore, IAppStoreSnapshotIn, IAppStoreSnapshotOut } from '@stores/app_store/app_store.types'
import { Environment } from '@services/environment/environment'
import { TEnvironment } from '@services/environment/environment.types'
import { mstMmkvStorage } from '@services/mst_mmkv_storage/mst_mmkv_storage'

const pickStoreKeys: string[] = []

const STORAGE_KEY = 'MST_APP_STORE-v3.1.0`'

const setupAppStore = async (): Promise<IAppStore> => {
  let appStore: IAppStore
  const env: TEnvironment = new Environment()

  await env.setup()

  try {
    const jsonData = mstMmkvStorage.getString(STORAGE_KEY)
    const data: IAppStoreSnapshotIn = JSON.parse(jsonData as string) || {}

    appStore = AppStore.create(data, env)
  } catch {
    appStore = AppStore.create({}, env)
  }

  onSnapshot(appStore, (snapshot: IAppStoreSnapshotOut) => {
    mstMmkvStorage.set(STORAGE_KEY, JSON.stringify(pick(snapshot, ...pickStoreKeys)))
  })

  return appStore
}

export { setupAppStore }
