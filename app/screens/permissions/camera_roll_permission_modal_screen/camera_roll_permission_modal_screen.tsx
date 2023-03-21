import React from 'react'
import { observer } from 'mobx-react-lite'
import { FocusAwareStatusBar } from '@molecules/focus_aware_status_bar/focus_aware_status_bar'
import { HomeStackScreenProps, HomeStackScreens } from '@navigators/home_stack_navigator/home_stack_navigator.types'
import { usePermissionsStore } from '@hooks/stores/stores'
import { Button } from 'react-native'
import { Text } from '@atoms/typography/text/text'

const CameraRollPermissionModalScreen = ({
  navigation,
}: HomeStackScreenProps<HomeStackScreens.CAMERA_ROLL_PERMISSION_MODAL>) => {
  const { cameraRollPermissionGroup } = usePermissionsStore()

  const onCancel = () => {
    navigation.pop()
  }

  const onGoToSettingsPress = async () => {
    await cameraRollPermissionGroup.request()
    navigation.pop()
  }

  return (
    <>
      <FocusAwareStatusBar translucent animated barStyle="dark-content" backgroundColor="transparent" />
      <Text>Camera Roll permission must be allowed</Text>
      <Button title="Go to settings" onPress={onGoToSettingsPress} />
      <Button title="Cancel" onPress={onCancel} />
    </>
  )
}

const ObservedCameraRollPermissionModalScreen = observer(CameraRollPermissionModalScreen)

export { CameraRollPermissionModalScreen, ObservedCameraRollPermissionModalScreen }
