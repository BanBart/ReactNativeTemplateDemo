import { Platform } from 'react-native'
import { Environment } from '@services/environment/environment'
import { TEnvironment } from '@services/environment/environment.types'

describe('Environment', () => {
  let environment: TEnvironment

  beforeAll(() => {
    environment = new Environment()
  })

  it('exposes properties', () => {
    expect(environment.navigation).toBeDefined()
    expect(environment.IS_ANDROID_DEVICE).toBeDefined()
    expect(environment.IS_IOS_DEVICE).toBeDefined()
    expect(environment.PLATFORM_VERSION).toBeDefined()
    expect(environment.envConfig).toBeDefined()
  })

  describe('#IS_IOS_DEVICE', () => {
    it('correctly detects ios device', () => {
      Platform.OS = 'ios'
      const env = new Environment()
      expect(env.IS_ANDROID_DEVICE).toBeFalsy()
      expect(env.IS_IOS_DEVICE).toBeTruthy()
    })
  })

  describe('#IS_ANDROID_DEVICE', () => {
    it('correctly detects android device', () => {
      Platform.OS = 'android'
      const env = new Environment()
      expect(env.IS_ANDROID_DEVICE).toBeTruthy()
      expect(env.IS_IOS_DEVICE).toBeFalsy()
    })
  })
})
