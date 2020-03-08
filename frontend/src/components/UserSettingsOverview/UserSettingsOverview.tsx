// libraries
import React from 'react'
// components
import ActionRow from 'shared/form/ActionRow/ActionRow'
import H1 from 'shared/H1/H1'
import LogoutButton from 'shared/LogoutButton/LogoutButton'
import PageQueryHandler from 'shared/PageQueryHandler/PageQueryHandler'
import Row from 'shared/form/Row/Row'
import Spacer from 'shared/Spacer/Spacer'
import UserSettingCreate from 'components/UserSettingCreate/UserSettingCreate'
import UserSettingDelete from 'components/UserSettingDelete/UserSettingDelete'
import Link from 'shared/Link/Link'
// graphql
import { GetSettings } from 'store/setting/query'
// interface
import { Setting } from 'store/setting/type'
import { UserSession } from 'store/userSession/type'
import { UserSettings } from 'store/userSetting/type'
import { LocalStorage } from 'types/types'

interface Props {
  rootPath: string
  updateLocalStorage: (localStorage: LocalStorage) => void
  userSession: UserSession
  userSettings: UserSettings
}

interface PageQueryHandler {
  data: { getSettings: Setting[] }
  status: { getSettings: JSX.Element }
}

const UserSettingsOverview = ({
  rootPath,
  updateLocalStorage,
  userSession,
  userSettings,
}: Props): JSX.Element => (
  <PageQueryHandler
    dataTestId="UserSettingsOverview"
    errorMessages={{
      getSettings: 'Angemeldete Geräte konnten nicht geladen werden',
    }}
    query={GetSettings}
    queryNames={['getSettings']}
  >
    {({
      data: { getSettings: settings },
      status: { getSettings: settingsQueryStatus },
    }: PageQueryHandler): JSX.Element => {
      return (
        <>
          <H1 context="page">Einstellungen</H1>
          {settingsQueryStatus}
          {!settingsQueryStatus &&
            settings &&
            settings.map(
              (setting: Setting): JSX.Element => {
                const isSelected = userSettings[setting.type]
                return (
                  <Row key={setting.id} htmlFor={setting.type}>
                    {isSelected ? (
                      <UserSettingDelete
                        setting={setting}
                        updateLocalStorage={updateLocalStorage}
                      />
                    ) : (
                      <UserSettingCreate
                        setting={setting}
                        updateLocalStorage={updateLocalStorage}
                      />
                    )}
                  </Row>
                )
              }
            )}
          <Spacer />
          <Row>
            <Link to={`${rootPath}/sessions`}>Angmeldete Geräte verwalten</Link>
          </Row>
          <ActionRow>
            <LogoutButton userSessionId={userSession.id} />
          </ActionRow>
        </>
      )
    }}
  </PageQueryHandler>
)

export default UserSettingsOverview
