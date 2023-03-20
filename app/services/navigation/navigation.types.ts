import { AppStackParamList } from '@navigators/app_stack_navigator/app_stack_navigator.types'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface AppParamList extends AppStackParamList {}
  }
}
