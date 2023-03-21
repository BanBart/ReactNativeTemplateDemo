import type { NativeStackScreenProps } from '@react-navigation/native-stack'

export enum HomeStackScreens {
  HOME = 'Home',
  PERMISSIONS = 'Permissions',
  CAMERA_ROLL_PERMISSION_MODAL = 'CameraRollPermission',
}

export type HomeStackParamList = {
  [HomeStackScreens.HOME]: undefined
  [HomeStackScreens.PERMISSIONS]: undefined
  [HomeStackScreens.CAMERA_ROLL_PERMISSION_MODAL]: undefined
}

export type HomeStackScreenProps<T extends keyof HomeStackParamList> = NativeStackScreenProps<HomeStackParamList, T>
