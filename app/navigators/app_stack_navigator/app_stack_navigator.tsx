import React, { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AppStackParamList, AppStackScreens } from '@navigators/app_stack_navigator/app_stack_navigator.types'
import { HomeStackNavigator } from '@navigators/home_stack_navigator/home_stack_navigator'
// import { useSessionStore } from '@hooks/stores/stores'

const AppStack = createNativeStackNavigator<AppStackParamList>()

const AppStackNavigator = (): ReactElement => {
  // const { isAuthenticated } = useSessionStore()

  return (
    <AppStack.Navigator
      screenOptions={{
        animation: 'fade',
        headerShown: false,
      }}>
      <AppStack.Screen name={AppStackScreens.HOME_STACK} component={HomeStackNavigator} />
      {/*{isAuthenticated ? (*/}
      {/*  <AppStack.Screen name={AppStackScreens.HOME_STACK} component={HomeStackNavigator} />*/}
      {/*) : (*/}
      {/*  <AppStack.Screen name={AppStackScreens.AUTHENTICATION_STACK} component={AuthenticationStackNavigator} />*/}
      {/*)}*/}
    </AppStack.Navigator>
  )
}

const ObservedAppStackNavigator = observer(AppStackNavigator)

export { AppStackNavigator, ObservedAppStackNavigator }
