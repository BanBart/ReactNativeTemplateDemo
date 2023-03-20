import {} from 'styled-components/native'
import { TStyledComponentsTheme } from './styled_components_theme'

declare module 'styled-components/native' {
  export interface DefaultTheme extends TStyledComponentsTheme {}
}
