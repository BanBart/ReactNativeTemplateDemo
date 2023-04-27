import { Platform } from 'react-native'
import envConfig, { NativeConfig } from 'react-native-config'
import { navigation, TNavigation } from '@services/navigation/navigation'

class Environment {
  readonly navigation: TNavigation

  readonly IS_ANDROID_DEVICE: boolean

  readonly IS_IOS_DEVICE: boolean

  readonly PLATFORM_VERSION: number

  readonly envConfig: NativeConfig

  constructor() {
    this.navigation = navigation
    this.IS_ANDROID_DEVICE = Platform.OS === 'android'
    this.IS_IOS_DEVICE = Platform.OS === 'ios'
    this.PLATFORM_VERSION = parseInt(<string>Platform.Version, 10)
    this.envConfig = envConfig
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async setup(): Promise<void> {
    // if (__DEV__) this.ensureEnvironmentVariablesExists()
  }

  private ensureEnvironmentVariablesExists(): void {
    if (!this.envConfig.APP_ENVIRONMENT)
      throw new Error('Missing APP_ENVIRONMENT env variable. Please check your .env config.')
    if (!this.envConfig.MMKV_STORAGE_ENCRYPTION_KEY)
      throw new Error('Missing MMKV_STORAGE_ENCRYPTION_KEY env variable. Please check your .env config.')
  }
}

export { Environment }
