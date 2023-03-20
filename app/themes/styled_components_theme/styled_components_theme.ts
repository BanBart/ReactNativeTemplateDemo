import { rgba } from 'polished'
import { Dimensions, PixelRatio } from 'react-native'
import { ms, vs, mvs } from 'react-native-size-matters'
import { isTablet as isTabletDeviceInfo } from 'react-native-device-info'

const isTablet = isTabletDeviceInfo()

const wp = (value: number) => PixelRatio.roundToNearestPixel(Dimensions.get('window').width * (value / 100))
const hp = (value: number) => PixelRatio.roundToNearestPixel(Dimensions.get('window').height * (value / 100))

const colors = {
  black: 'black',
  white: 'white',
  blue: 'blue',
  red: 'red',
  green: 'green',
}

export type TStyledComponentsTheme = {
  colors: typeof colors
  rgba: typeof rgba
  wp: (value: number) => number
  hp: (value: number) => number
  ms: typeof ms
  vs: typeof vs
  mvs: typeof mvs
  isTablet: boolean
  navbarHeight: number
  spacing: {
    small: number
    medium: number
    large: number
  }
}

const styledComponentsTheme: TStyledComponentsTheme = {
  colors,
  rgba,
  wp,
  hp,
  ms,
  vs,
  mvs,
  isTablet,
  navbarHeight: isTablet ? 64 : 48,
  spacing: {
    small: isTablet ? 24 : 16,
    medium: isTablet ? 32 : 24,
    large: isTablet ? 48 : 32,
  },
}

export { styledComponentsTheme }
