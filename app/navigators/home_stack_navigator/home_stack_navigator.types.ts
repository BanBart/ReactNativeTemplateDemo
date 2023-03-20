import type { NativeStackScreenProps } from '@react-navigation/native-stack'

export enum HomeStackScreens {
  HOME = 'Home',
  PERMISSIONS = 'Permissions',
}

export type HomeStackParamList = {
  [HomeStackScreens.HOME]: undefined
  [HomeStackScreens.PERMISSIONS]: undefined
}

export type HomeStackScreenProps<T extends keyof HomeStackParamList> = NativeStackScreenProps<HomeStackParamList, T>
