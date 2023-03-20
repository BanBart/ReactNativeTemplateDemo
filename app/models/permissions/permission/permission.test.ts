import { Permission } from '@models/permissions/permission/permission'
import { RESULTS } from 'react-native-permissions'

describe('Permission', () => {
  it('Defines properties and defaults', () => {
    const permission = Permission.create({ id: 'id' })

    expect(permission.id).toBeDefined()
    expect(permission.result).toBeDefined()

    expect(permission.result).toEqual(RESULTS.DENIED)
  })

  describe('#isGranted', () => {
    it('returns true when result is granted', () => {
      const permission = Permission.create({ id: 'id', result: RESULTS.GRANTED })

      expect(permission.isGranted).toBeTruthy()
    })
  })

  describe('#isUnavailable', () => {
    it('returns true when result is unavailable', () => {
      const permission = Permission.create({ id: 'id', result: RESULTS.UNAVAILABLE })

      expect(permission.isUnavailable).toBeTruthy()
    })
  })

  describe('#isBlocked', () => {
    it('returns true when result is blocked', () => {
      const permission = Permission.create({ id: 'id', result: RESULTS.BLOCKED })

      expect(permission.isBlocked).toBeTruthy()
    })
  })

  describe('#isDenied', () => {
    it('returns true when result is denied', () => {
      const permission = Permission.create({ id: 'id', result: RESULTS.DENIED })

      expect(permission.isDenied).toBeTruthy()
    })
  })

  describe('#isLimited', () => {
    it('returns true when result is limited', () => {
      const permission = Permission.create({ id: 'id', result: RESULTS.LIMITED })

      expect(permission.isLimited).toBeTruthy()
    })
  })
})
