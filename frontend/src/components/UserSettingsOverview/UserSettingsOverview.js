// libraries
import React from 'react'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
// components
import ActionRow from 'shared/form/ActionRow/ActionRow'
import ErrorMessage from 'shared/ErrorMessage/ErrorMessage'
import LogoutButton from 'shared/LogoutButton/LogoutButton'
import CenteredSpinner from 'shared/CenteredSpinner/CenteredSpinner'
import FadeTransition from 'shared/FadeTransition/FadeTransition'
import H1 from 'shared/H1/H1.tsx'
import Row from 'shared/form/Row/Row'
import UserSettingCreate from 'components/UserSettingCreate/UserSettingCreate'
import UserSettingDelete from 'components/UserSettingDelete/UserSettingDelete'
// graphql
import { GetSettings } from 'store/setting/query.gql'

const UserSettingsOverview = props => (
  <FadeTransition>
    <H1 context="page">Einstellungen</H1>
    <Query query={GetSettings}>
      {({ loading, error, data }) => {
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
        return data.getSettings.map(setting => {
          const isSelected = props.userSettings[setting.type]
          return (
            <Row key={setting.id}>
              {setting.title}{' '}
              {isSelected ? (
                <UserSettingDelete
                  setting={setting}
                  updateLocalStorage={props.updateLocalStorage}
                />
              ) : (
                <UserSettingCreate
                  setting={setting}
                  updateLocalStorage={props.updateLocalStorage}
                />
              )}
            </Row>
          )
        })
      }}
    </Query>
    <Row>
      <Link to={`${props.rootPath}/sessions`}>Angmeldete Geräte verwalten</Link>
    </Row>
    <ActionRow>
      <LogoutButton
        clearLocalStorage={props.clearLocalStorage}
        createNotificationBanner={props.createNotificationBanner}
        userSessionId={props.userSession.id}
      />
    </ActionRow>
  </FadeTransition>
)

export default UserSettingsOverview
