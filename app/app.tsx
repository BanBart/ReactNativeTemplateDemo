import React, { ReactElement } from 'react'
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context'
// import { registerCustomIconType } from '@rneui/base'
// import { CustomIcon } from '@atoms/icons/custom/custom'
import { AppStackNavigator } from '@navigators/app_stack_navigator/app_stack_navigator'
import { StoreProvider } from '@providers/store_provider/store_provider'
import { StyledComponentsProvider } from '@providers/styled_components_provider/styled_components_provider'
import { NavigationProvider } from '@providers/navigation_provider/navigation_provider'

// registerCustomIconType('custom', CustomIcon)

const App = (): ReactElement => (
  <StoreProvider>
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <StyledComponentsProvider>
        <NavigationProvider>
          <AppStackNavigator />
        </NavigationProvider>
      </StyledComponentsProvider>
    </SafeAreaProvider>
  </StoreProvider>
)

export { App }
