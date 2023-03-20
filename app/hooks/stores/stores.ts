import { useContext } from 'react'
import { StoreContext } from '@providers/store_provider/store_provider'
import { IAppStore } from '@stores/app_store/app_store.types'
import { IPermissionsStore } from '@stores/permissions/permissions_store/permissions_store.types'

const useAppStore = (): IAppStore => useContext(StoreContext)

const usePermissionsStore = (): IPermissionsStore => useContext(StoreContext).permissionsStore

export { useAppStore, usePermissionsStore }
