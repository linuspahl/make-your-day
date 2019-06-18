// libraries
import * as React from 'react'
// components
import UserSettingsOverview from './UserSettingsOverview'
import {
  renderWithAppRoot,
  wait,
  fireEvent,
  leftClickOption,
  cleanup,
} from 'testUtils'
// fixtures
import { setting, getSettingsSuccess } from 'store/setting/fixtures'
import {
  createUserSettingSuccess,
  deleteUserSettingSuccess,
} from 'store/userSetting/fixtures'
import { userSession } from 'store/userSession/fixtures'
import { userSetting } from 'store/userSetting/fixtures'

describe('UserSettingsOverview should', (): void => {
  afterEach(cleanup)

  test('list fetched settings', async (): Promise<void> => {
    const { getByText } = renderWithAppRoot(
      <UserSettingsOverview
        rootPath="/settings"
        clearLocalStorage={(): void => {}}
        createNotificationBanner={(): void => {}}
        updateLocalStorage={(): void => {}}
        userSession={userSession}
        userSettings={{ [userSetting.value]: userSetting }}
      />,
      { mocks: [getSettingsSuccess] }
    )
    // Wait for the Query component
    await wait()
    expect(getByText(setting.title)).toBeInTheDocument()
  })

  test('update localstorage if setting gets created', async (): Promise<
    void
  > => {
    const updateLocalStorageStub = jest.fn()
    const { getByLabelText } = renderWithAppRoot(
      <UserSettingsOverview
        rootPath="/settings"
        clearLocalStorage={(): void => {}}
        createNotificationBanner={(): void => {}}
        updateLocalStorage={updateLocalStorageStub}
        userSession={userSession}
        userSettings={{}}
      />,
      {
        mocks: [getSettingsSuccess, createUserSettingSuccess],
      }
    )
    // Wait for the Query component
    await wait()
    fireEvent.click(getByLabelText(setting.title), leftClickOption)
    await wait()
    expect(updateLocalStorageStub).toBeCalledWith({
      [userSetting.setting.type]: JSON.parse(userSetting.value),
    })
  })

  test('update localstorage if setting gets deleted', async (): Promise<
    void
  > => {
    const updateLocalStorageStub = jest.fn()
    const { getByLabelText } = renderWithAppRoot(
      <UserSettingsOverview
        rootPath="/settings"
        clearLocalStorage={(): void => {}}
        createNotificationBanner={(): void => {}}
        updateLocalStorage={updateLocalStorageStub}
        userSession={userSession}
        userSettings={{ [userSetting.setting.type]: userSetting }}
      />,
      {
        mocks: [getSettingsSuccess, deleteUserSettingSuccess],
      }
    )
    // Wait for the Query component
    await wait()
    fireEvent.click(getByLabelText(setting.title), leftClickOption)
    await wait()
    expect(updateLocalStorageStub).toBeCalledWith({
      [userSetting.setting.type]: false,
    })
  })
})
