import { setupAppStore } from '@stores/setup_app_store'
import { getEnv } from 'mobx-state-tree'
import { Environment } from '@services/environment/environment'

describe('setupAppStore', () => {
  it('creates new empty appStore', async () => {
    const appStore = await setupAppStore()

    expect(appStore).toBeDefined()
    expect(getEnv(appStore)).toBeInstanceOf(Environment)
  })
})
