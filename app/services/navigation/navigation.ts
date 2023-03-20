import { createNavigationContainerRef } from '@react-navigation/native'
import { AppStackParamList } from '@navigators/app_stack_navigator/app_stack_navigator.types'

const navigationRef = createNavigationContainerRef<AppStackParamList>()

const navigate = (...args: Parameters<typeof navigationRef.navigate>) => {
  if (!navigationRef.isReady()) return

  navigationRef.navigate(...args)
}

export type TNavigation = {
  navigate: typeof navigationRef.navigate
}

const navigation: TNavigation = {
  navigate,
}

export { navigationRef }
export { navigation }
