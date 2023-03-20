import React from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components/native'
import { View, Button } from 'react-native'
import { Text } from '@atoms/typography/text/text'
import { HomeStackScreenProps, HomeStackScreens } from '@navigators/home_stack_navigator/home_stack_navigator.types'

const Wrapper = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`

const HomeScreen = ({ navigation }: HomeStackScreenProps<HomeStackScreens.HOME>) => {
  const onPress = () => {
    navigation.navigate(HomeStackScreens.PERMISSIONS)
  }

  return (
    <Wrapper>
      <Text>Welcome!</Text>
      <Button title="Permissions" onPress={onPress} />
    </Wrapper>
  )
}

const ObservedHomeScreen = observer(HomeScreen)

export { HomeScreen, ObservedHomeScreen }
