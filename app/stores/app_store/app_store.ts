import { AppState, AppStateStatus, NativeEventSubscription } from 'react-native'
import { types, getEnv } from 'mobx-state-tree'
import NetInfo, { NetInfoState, NetInfoSubscription } from '@react-native-community/netinfo'
import { TEnvironment } from '@services/environment/environment.types'
import { EnumAppState } from '@stores/app_store/app_store.types'
import { PermissionsStore } from '@stores/permissions/permissions_store/permissions_store'

const AppStore = types
  .model('AppStore', {
    permissionsStore: types.optional(
      types.late(() => PermissionsStore),
      {},
    ),
    appState: types.optional(types.enumeration<EnumAppState>(Object.values(EnumAppState)), EnumAppState.UNKNOWN),
    isInternetReachable: types.optional(types.boolean, false),
  })
  .views((self) => {
    return {
      get isForeground(): boolean {
        return self.appState === EnumAppState.ACTIVE
      },
      get isBackground(): boolean {
        return self.appState === EnumAppState.BACKGROUND || self.appState === EnumAppState.INACTIVE
      },
    }
  })
  .volatile<{
    appStateChangeEventListenerSubscription: undefined | NativeEventSubscription
    appStateFocusEventListenerSubscription: undefined | NativeEventSubscription
    appStateBlurEventListenerSubscription: undefined | NativeEventSubscription
    netInfoChangeEventListenerSubscription: undefined | NetInfoSubscription
  }>(() => {
    return {
      appStateChangeEventListenerSubscription: undefined,
      appStateFocusEventListenerSubscription: undefined,
      appStateBlurEventListenerSubscription: undefined,
      netInfoChangeEventListenerSubscription: undefined,
    }
  })
  .actions((self) => {
    return {
      setAppState(appState: EnumAppState): void {
        self.appState = appState
      },
      setIsInternetReachable(booleanFlag: boolean): void {
        self.isInternetReachable = booleanFlag
      },
    }
  })
  .actions((self) => {
    return {
      handleAppStateChange(appState: AppStateStatus): void {
        self.setAppState(appState as EnumAppState)
      },
      handleAppStateAndroidFocus(): void {
        self.setAppState(EnumAppState.ACTIVE)
      },
      handleAppStateAndroidBlur(): void {
        self.setAppState(EnumAppState.INACTIVE)
      },
      handleNetInfoChange(netInfoState: NetInfoState) {
        self.setIsInternetReachable(!!netInfoState.isInternetReachable)
      },
    }
  })
  .actions((self) => {
    const { IS_ANDROID_DEVICE } = getEnv<TEnvironment>(self)

    return {
      subscribeToAppStateChangeListener(): void {
        self.appStateChangeEventListenerSubscription?.remove()
        self.appStateChangeEventListenerSubscription = AppState.addEventListener('change', self.handleAppStateChange)

        if (IS_ANDROID_DEVICE) {
          self.appStateFocusEventListenerSubscription?.remove()
          self.appStateFocusEventListenerSubscription = AppState.addEventListener(
            'focus',
            self.handleAppStateAndroidFocus,
          )

          self.appStateBlurEventListenerSubscription?.remove()
          self.appStateBlurEventListenerSubscription = AppState.addEventListener('blur', self.handleAppStateAndroidBlur)
        }
      },
      subscribeToNetInfoChangeListener(): void {
        if (self.netInfoChangeEventListenerSubscription) self.netInfoChangeEventListenerSubscription()
        self.netInfoChangeEventListenerSubscription = NetInfo.addEventListener(self.handleNetInfoChange)
      },
    }
  })
  .actions((self) => {
    const { IS_ANDROID_DEVICE } = getEnv<TEnvironment>(self)

    return {
      initialize(): void {
        self.permissionsStore.initialize()
        self.setAppState(AppState.currentState as EnumAppState)
        self.setIsInternetReachable(false)
        self.subscribeToAppStateChangeListener()
        self.subscribeToNetInfoChangeListener()
      },
      reset(): void {
        self.permissionsStore.reset()
        self.setAppState(AppState.currentState as EnumAppState)
        self.setIsInternetReachable(false)
        self.appStateChangeEventListenerSubscription?.remove()
        if (self.netInfoChangeEventListenerSubscription) self.netInfoChangeEventListenerSubscription()

        if (IS_ANDROID_DEVICE) {
          self.appStateFocusEventListenerSubscription?.remove()
          self.appStateBlurEventListenerSubscription?.remove()
        }
      },
    }
  })
  .actions((self) => {
    return {
      afterCreate(): void {
        self.initialize()
      },
    }
  })

export { AppStore }
