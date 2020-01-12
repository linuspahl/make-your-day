// interfaces
import { Setting } from 'store/setting/type'

export interface UserSettings {
  [key: string]: UserSetting
}

export interface UserSetting {
  id: string
  setting: Setting
  value: string
}
