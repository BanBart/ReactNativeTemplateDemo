import React, { ReactElement } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeStackParamList, HomeStackScreens } from '@navigators/home_stack_navigator/home_stack_navigator.types'
import { ObservedHomeScreen } from '@screens/home_screen/home_screen'
import { ObservedPermissionsScreen } from '@screens/permissions/permissions_screen/permissions_screen'
import { ObservedCameraRollPermissionModalScreen } from '@screens/permissions/camera_roll_permission_modal_screen/camera_roll_permission_modal_screen'

const HomeStack = createNativeStackNavigator<HomeStackParamList>()

const HomeStackNavigator = (): ReactElement => {
  return (
    <HomeStack.Navigator
      initialRouteName={HomeStackScreens.HOME}
      screenOptions={{
        animation: 'slide_from_right',
      }}>
      <HomeStack.Screen name={HomeStackScreens.HOME} component={ObservedHomeScreen} />
      <HomeStack.Screen name={HomeStackScreens.PERMISSIONS} component={ObservedPermissionsScreen} />
      <HomeStack.Screen
        name={HomeStackScreens.CAMERA_ROLL_PERMISSION_MODAL}
        options={{ presentation: 'transparentModal', headerShown: false }}
        component={ObservedCameraRollPermissionModalScreen}
      />
    </HomeStack.Navigator>
  )
}

export { HomeStackNavigator }
