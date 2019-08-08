// interfaces
import { Setting } from 'store/setting/type'
// graphql
import { GetSettings } from 'store/setting/query'

export const setting: Setting = {
  id: '1',
  title: 'Nachtmodus',
  type: 'nightMode',
  defaultValue: 'false',
}

// # Api stubs

// ## getSettings
const getSettingsRequest = {
  request: {
    query: GetSettings,
  },
}
export const getSettingsSuccess = {
  ...getSettingsRequest,
  result: {
    data: {
      getSettings: [setting],
    },
  },
}
export const getSettingsError = {
  ...getSettingsRequest,
  error: new Error('getSettings failed'),
}
