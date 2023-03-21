import React from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components/native'
import { View, Button } from 'react-native'
import { Text } from '@atoms/typography/text/text'
import { HomeStackScreenProps, HomeStackScreens } from '@navigators/home_stack_navigator/home_stack_navigator.types'
import { usePermissionsStore } from '@hooks/stores/stores'

const Wrapper = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`

const HomeScreen = ({ navigation }: HomeStackScreenProps<HomeStackScreens.HOME>) => {
  const { cameraRollPermissionGroup } = usePermissionsStore()

  const onPermissionsListPress = () => {
    navigation.navigate(HomeStackScreens.PERMISSIONS)
  }

  const onGrantCameraRollPermissionPress = async () => {
    if (cameraRollPermissionGroup.isGranted) return

    if (cameraRollPermissionGroup.isBlocked || cameraRollPermissionGroup.isUnavailable)
      navigation.replace(HomeStackScreens.CAMERA_ROLL_PERMISSION_MODAL)
    else await cameraRollPermissionGroup.request()
  }

  return (
    <Wrapper>
      <Text>Welcome!</Text>
      <Button title="Permissions list" onPress={onPermissionsListPress} />
      <Button title="Grant camera roll permission" onPress={onGrantCameraRollPermissionPress} />
    </Wrapper>
  )
}

const ObservedHomeScreen = observer(HomeScreen)

export { HomeScreen, ObservedHomeScreen }
