import React, { ReactNode, ReactElement } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { navigationRef } from '@services/navigation/navigation'
import { reactNavigationTheme } from '@themes/react_navigation_theme/react_navigation_theme'

type TNavigationProviderProps = {
  children: ReactNode
}

const BOOT_SPLASH_SCREEN_HIDE_DELAY = 1000

const NavigationProvider = ({ children }: TNavigationProviderProps): ReactElement => {
  const onReady = async () => {
    // Hack, delay hiding of splash screen just a bit :)
    // eslint-disable-next-line no-promise-executor-return
    await new Promise((resolve) => setTimeout(resolve, BOOT_SPLASH_SCREEN_HIDE_DELAY))
    // await RNBootSplash.hide({ fade: true })
  }

  return (
    <NavigationContainer theme={reactNavigationTheme} onReady={onReady} ref={navigationRef}>
      {children}
    </NavigationContainer>
  )
}

export { NavigationProvider }
