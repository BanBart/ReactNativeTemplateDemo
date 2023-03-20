import React, { ReactElement, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFocusEffect } from '@react-navigation/native'
import { FocusAwareStatusBar } from '@molecules/focus_aware_status_bar/focus_aware_status_bar'
import { HomeStackScreens, HomeStackScreenProps } from '@navigators/home_stack_navigator/home_stack_navigator.types'
import { ObservedPermissionsContent } from '@organisms/permissions/permissions_content/permissions_content'
import { usePermissionsStore } from '@hooks/stores/stores'

const Wrapper = styled(SafeAreaView)`
  flex: 1;
  padding: ${(props) => props.theme.spacing.small}px;
`

const PermissionsScreen = ({ navigation }: HomeStackScreenProps<HomeStackScreens.PERMISSIONS>): ReactElement | null => {
  const { areAllPermissionsGranted } = usePermissionsStore()

  useFocusEffect(
    useCallback(() => {
      if (areAllPermissionsGranted) navigation.replace(HomeStackScreens.HOME)
    }, [navigation, areAllPermissionsGranted]),
  )

  if (areAllPermissionsGranted) return null

  return (
    <Wrapper edges={['left', 'right', 'bottom']}>
      <FocusAwareStatusBar translucent animated barStyle="dark-content" backgroundColor="transparent" />
      <ObservedPermissionsContent />
    </Wrapper>
  )
}

const ObservedPermissionsScreen = observer(PermissionsScreen)

export { PermissionsScreen, ObservedPermissionsScreen }
