import React, { createContext, useEffect, useState, ReactNode, ReactElement } from 'react'
import { isEmpty } from 'lodash'
import { setupAppStore } from '@stores/setup_app_store'
import { IAppStore } from '@stores/app_store/app_store.types'

type TStoreProviderProps = {
  children: ReactNode
}

const StoreContext = createContext<IAppStore>({} as IAppStore)

const StoreProvider = ({ children }: TStoreProviderProps): ReactElement | null => {
  const [appStore, setAppStore] = useState<IAppStore>({} as IAppStore)

  useEffect(() => {
    ;(async (): Promise<void> => {
      setAppStore(await setupAppStore())
    })()
  }, [])

  if (isEmpty(appStore)) return null

  return <StoreContext.Provider value={appStore}>{children}</StoreContext.Provider>
}

export { StoreContext }

export { StoreProvider }
