import { MMKV } from 'react-native-mmkv'
import envConfig from 'react-native-config'

const STORAGE_ID = `mst_mmkv_storage-${envConfig.APP_ENVIRONMENT || 'DEV'}`

export const mstMmkvStorage = new MMKV({
  id: STORAGE_ID,
  encryptionKey: envConfig.MMKV_STORAGE_ENCRYPTION_KEY || 'banbart',
})
