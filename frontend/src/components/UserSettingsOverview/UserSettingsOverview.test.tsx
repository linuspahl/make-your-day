// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import UserSettingsOverview from './UserSettingsOverview'
// fixtures
import { userSession } from 'store/userSession/fixtures';
import { userSetting } from 'store/userSetting/fixtures';

describe('UserSettingsOverview should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(
      <UserSettingsOverview
        updateLocalStorage={() => {}}
        clearLocalStorage={() => {}}
        createNotificationBanner={() => {}}
        rootPath="/"
        userSession={userSession}
        userSettings={{ 'nightmode': userSetting }}
      />
    )
  })
})
