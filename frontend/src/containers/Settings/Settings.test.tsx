// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import Settings from './Settings'
// fixtures
import { userSession } from 'store/userSession/fixtures';
import { userSetting } from 'store/userSetting/fixtures';

describe('Settings should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(
      <Settings
        updateLocalStorage={() => {}}
        userSession={userSession}
        userSettings={{'nightmode': userSetting}}
        rootPath="/"
        createNotificationBanner={() => {}}
        clearLocalStorage={() => {}}
      />)
  })
})
