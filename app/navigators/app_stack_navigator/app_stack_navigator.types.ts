import type { NavigatorScreenParams } from '@react-navigation/native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { HomeStackParamList } from '@navigators/home_stack_navigator/home_stack_navigator.types'

export enum AppStackScreens {
  HOME_STACK = 'HomeStack',
  AUTHENTICATION_STACK = 'AuthenticationStack',
}

export type AppStackParamList = {
  [AppStackScreens.HOME_STACK]: NavigatorScreenParams<HomeStackParamList>
  [AppStackScreens.AUTHENTICATION_STACK]: undefined
}

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<AppStackParamList, T>
