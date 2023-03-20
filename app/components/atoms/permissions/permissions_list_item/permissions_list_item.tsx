import React, { ReactElement } from 'react'
import { View, Button } from 'react-native'
import styled from 'styled-components/native'
import { Text } from '@atoms/typography/text/text'
import { useStyledComponentsTheme } from '@hooks/styled_components_theme/styled_components_theme'

const Wrapper = styled(View)`
  align-items: center;
  justify-content: ${(props) => (props.theme.isTablet ? 'space-between' : 'center')};
  padding-vertical: 24px;
  flex-direction: ${(props) => (props.theme.isTablet ? 'row' : 'column')};
`

const Placeholder = styled(View)`
  width: ${(props) => (props.theme.isTablet ? 300 : 234)}px;
  align-items: center;
  justify-content: center;
`

type TPermissionsListItemProps = {
  label: string
  onPress: () => void
  isGranted: boolean
  isBlocked: boolean
  isUnavailable: boolean
}

const PermissionsListItem = ({
  label,
  onPress,
  isGranted,
  isBlocked,
  isUnavailable,
}: TPermissionsListItemProps): ReactElement => {
  const { colors } = useStyledComponentsTheme()
  return (
    <Wrapper>
      <Text textTransform="capitalize">{label}</Text>
      {isGranted ? (
        <Placeholder>
          <Text color={colors.green}>Granted!</Text>
        </Placeholder>
      ) : (
        <Button title={isBlocked || isUnavailable ? 'Go to Settings' : 'Grant Permission'} onPress={onPress} />
      )}
    </Wrapper>
  )
}

export { PermissionsListItem }
