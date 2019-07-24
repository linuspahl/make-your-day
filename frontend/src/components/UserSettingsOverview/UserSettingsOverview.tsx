// libraries
import * as React from 'react'
import { Link } from 'react-router-dom'
// components
import ActionRow from 'shared/form/ActionRow/ActionRow'
import H1 from 'shared/H1/H1'
import LogoutButton from 'shared/LogoutButton/LogoutButton'
import PageQueryHandler from 'shared/PageQueryHandler/PageQueryHandler'
import Row from 'shared/form/Row/Row'
import UserSettingCreate from 'components/UserSettingCreate/UserSettingCreate'
import UserSettingDelete from 'components/UserSettingDelete/UserSettingDelete'
// graphql
import { GetSettings } from 'store/setting/query'
// interface
import { UserSetting } from 'store/userSetting/type'
import { Setting } from 'store/setting/type'
import { UserSession } from 'store/userSession/type'
import { NotificationCreate, LocalStorage } from 'types/types'

interface Props {
  clearLocalStorage: () => void
  createNotificationBanner: (notification: NotificationCreate) => void
  rootPath: string
  updateLocalStorage: (localStorage: LocalStorage) => void
  userSession: UserSession
  userSettings: { [key: string]: UserSetting }
}

interface PageQueryHandler {
  data: { getSettings: Setting[] }
  status: { getSettings: JSX.Element }
}

class UserSettingsOverview extends React.Component<Props> {
  public render(): JSX.Element {
    const {
      clearLocalStorage,
      createNotificationBanner,
      rootPath,
      updateLocalStorage,
      userSession,
      userSettings,
    } = this.props
    return (
      <PageQueryHandler
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
            <React.Fragment>
              <H1 context="page">Einstellungen</H1>
              {settingsQueryStatus}
              {!settingsQueryStatus &&
                settings &&
                settings.map(
                  (setting: Setting): JSX.Element => {
                    const isSelected =
                      userSettings[setting.type] &&
                      userSettings[setting.type].value
                        ? userSettings[setting.type].value
                        : false
                    return (
                      <Row key={setting.id} htmlFor={setting.type}>
                        {setting.title}{' '}
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
              <Row>
                <Link to={`${rootPath}/sessions`}>
                  Angmeldete Geräte verwalten
                </Link>
              </Row>
              <ActionRow>
                <LogoutButton
                  clearLocalStorage={clearLocalStorage}
                  createNotificationBanner={createNotificationBanner}
                  userSessionId={userSession.id}
                />
              </ActionRow>
            </React.Fragment>
          )
        }}
      </PageQueryHandler>
    )
  }
}

export default UserSettingsOverview
