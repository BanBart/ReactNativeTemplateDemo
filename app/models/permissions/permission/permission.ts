import { types } from 'mobx-state-tree'
import { RESULTS, PermissionStatus } from 'react-native-permissions'

const Permission = types
  .model('Permission', {
    id: types.identifier,
    result: types.optional(types.enumeration<PermissionStatus>(Object.values(RESULTS)), RESULTS.DENIED),
  })
  .views((self) => {
    return {
      get isGranted(): boolean {
        return self.result === RESULTS.GRANTED
      },
      get isUnavailable(): boolean {
        return self.result === RESULTS.UNAVAILABLE
      },
      get isBlocked(): boolean {
        return self.result === RESULTS.BLOCKED
      },
      get isDenied(): boolean {
        return self.result === RESULTS.DENIED
      },
      get isLimited(): boolean {
        return self.result === RESULTS.LIMITED
      },
    }
  })

export { Permission }
