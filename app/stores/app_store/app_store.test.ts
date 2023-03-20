import { AppStore } from '@stores/app_store/app_store'
import { EnumAppState } from '@stores/app_store/app_store.types'

describe('AppStore', () => {
  it('Defines properties and defaults', () => {
    const appStore = AppStore.create({})

    expect(appStore.permissionsStore).toBeDefined()
    expect(appStore.appState).toBeDefined()

    expect(appStore.appState).toEqual(EnumAppState.UNKNOWN)
  })

  describe('#isForeground', () => {
    it('returns true when appState is active', () => {
      const appStore = AppStore.create({})

      appStore.setAppState(EnumAppState.ACTIVE)
      expect(appStore.isForeground).toBe(true)
    })

    it('returns false when appState is not active', () => {
      const appStore = AppStore.create({})

      appStore.setAppState(EnumAppState.INACTIVE)
      expect(appStore.isForeground).toBe(false)

      appStore.setAppState(EnumAppState.BACKGROUND)
      expect(appStore.isForeground).toBe(false)

      appStore.setAppState(EnumAppState.UNKNOWN)
      expect(appStore.isForeground).toBe(false)

      appStore.setAppState(EnumAppState.EXTENSION)
      expect(appStore.isForeground).toBe(false)
    })
  })

  describe('#isBackground', () => {
    it('returns true when appState is inactive or background', () => {
      const appStore = AppStore.create({})

      appStore.setAppState(EnumAppState.INACTIVE)
      expect(appStore.isBackground).toBe(true)

      appStore.setAppState(EnumAppState.BACKGROUND)
      expect(appStore.isBackground).toBe(true)
    })

    it('returns false when appState is neither inactive nor background', () => {
      const appStore = AppStore.create({})

      appStore.setAppState(EnumAppState.ACTIVE)
      expect(appStore.isBackground).toBe(false)

      appStore.setAppState(EnumAppState.UNKNOWN)
      expect(appStore.isBackground).toBe(false)

      appStore.setAppState(EnumAppState.EXTENSION)
      expect(appStore.isBackground).toBe(false)
    })
  })
})
