import { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { TStyledComponentsTheme } from '@themes/styled_components_theme/styled_components_theme'

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
const useStyledComponentsTheme = (): TStyledComponentsTheme => useContext(ThemeContext)

export { useStyledComponentsTheme }
