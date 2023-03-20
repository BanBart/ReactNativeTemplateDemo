import { Text as TextReactNative } from 'react-native'
import styled from 'styled-components/native'

const Text = styled(TextReactNative)<{
  textTransform?: string
  textAlign?: string
  color?: string
}>`
  font-family: Arial;
  letter-spacing: 0;
  color: ${(props) => props.color || props.theme.colors.black};
  ${(props) =>
    props.textTransform &&
    `
    text-transform: ${props.textTransform};
  `}
  ${(props) =>
    props.textAlign &&
    `
    text-align: ${props.textAlign};
  `}
`

export { Text }
