// libraries
import React from 'react'
// components
import UserSettingsOverview from 'components/UserSettingsOverview/UserSettingsOverview'
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
import { userSetting } from 'store/userSetting/fixtures'

describe('UserSettingsOverview should', (): void => {
  afterEach(cleanup)

  test('list fetched settings', async (): Promise<void> => {
    const { getByText } = renderWithAppRoot(
      <UserSettingsOverview rootPath="/settings" />,
      {
        mocks: [getSettingsSuccess],
      }
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
      <UserSettingsOverview rootPath="/settings" />,
      {
        mocks: [getSettingsSuccess, createUserSettingSuccess],
        context: { updateLocalStorage: updateLocalStorageStub },
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
      <UserSettingsOverview rootPath="/settings" />,
      {
        mocks: [getSettingsSuccess, deleteUserSettingSuccess],
        context: {
          updateLocalStorage: updateLocalStorageStub,
          userSettings: {
            nightMode: true,
            leftHandMode: true,
            showAppBgImage: true,
          },
        },
      }
    )
    // Wait for the Query component
    await wait()
    fireEvent.click(getByLabelText(setting.title), leftClickOption)
    await wait()
    expect(updateLocalStorageStub).toBeCalledWith({
      [userSetting.setting.type]: 'false',
    })
  })
})
