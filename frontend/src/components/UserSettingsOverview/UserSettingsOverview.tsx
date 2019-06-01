// libraries
import * as React from 'react'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
// components
import ActionRow from 'shared/form/ActionRow/ActionRow'
import ErrorMessage from 'shared/ErrorMessage/ErrorMessage'
import LogoutButton from 'shared/LogoutButton/LogoutButton'
import CenteredSpinner from 'shared/CenteredSpinner/CenteredSpinner'
import FadeTransition from 'shared/FadeTransition/FadeTransition'
import H1 from 'shared/H1/H1'
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
import { ApolloError } from 'apollo-boost'

interface Props {
  clearLocalStorage: () => void
  createNotificationBanner: (notification: NotificationCreate) => void
  rootPath: string
  updateLocalStorage: (localStorage: LocalStorage) => void
  userSession: UserSession
  userSettings: { [key: string]: UserSetting }
}

class UserSettingsOverview extends React.Component<Props> {
  public render(): React.ReactElement {
    return (
      <FadeTransition>
        <H1 context="page">Einstellungen</H1>
        <Query query={GetSettings}>
          {({
            loading,
            error,
            data,
          }: {
            loading: boolean
            error?: ApolloError
            data: { getSettings: Setting[] }
          }): JSX.Element | JSX.Element[] => {
            if (loading) return <CenteredSpinner />
            if (error)
              return (
                <ErrorMessage
                  error={error}
                  message="Angemeldete Geräte konnten nicht geladen werden"
                />
              )
            // We are getting the userSettings as props
            // Because we are just using booleans for the settings value so far, we are able to use checkboxes only
            return data.getSettings.map(
              (setting: Setting): JSX.Element => {
                const isSelected = this.props.userSettings[setting.type]
                return (
                  <Row key={setting.id}>
                    {setting.title}{' '}
                    {isSelected ? (
                      <UserSettingDelete
                        setting={setting}
                        updateLocalStorage={this.props.updateLocalStorage}
                      />
                    ) : (
                      <UserSettingCreate
                        setting={setting}
                        updateLocalStorage={this.props.updateLocalStorage}
                      />
                    )}
                  </Row>
                )
              }
            )
          }}
        </Query>
        <Row>
          <Link to={`${this.props.rootPath}/sessions`}>
            Angmeldete Geräte verwalten
          </Link>
        </Row>
        <ActionRow>
          <LogoutButton
            clearLocalStorage={this.props.clearLocalStorage}
            createNotificationBanner={this.props.createNotificationBanner}
            userSessionId={this.props.userSession.id}
          />
        </ActionRow>
      </FadeTransition>
    )
  }
}

export default UserSettingsOverview
