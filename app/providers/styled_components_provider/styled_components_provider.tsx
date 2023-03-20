import React, { ReactNode, ReactElement } from 'react'
import { ThemeProvider } from 'styled-components/native'
import { styledComponentsTheme } from '@themes/styled_components_theme/styled_components_theme'

type TStyledComponentsProviderProps = {
  children: ReactNode
}

const StyledComponentsProvider = ({ children }: TStyledComponentsProviderProps): ReactElement => (
  <ThemeProvider theme={styledComponentsTheme}>{children}</ThemeProvider>
)

export { StyledComponentsProvider }
