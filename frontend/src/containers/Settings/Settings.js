// libraries
import React from 'react'
// components
import PageLayout from 'components/PageLayout/PageLayout'
import H1 from 'shared/H1/H1'
import ContentBox from 'shared/ContentBox/ContentBox'
import ActionRow from 'shared/form/ActionRow/ActionRow'
import Row from 'shared/form/Row/Row'
import Button from 'shared/Button/Button'
import UserSettingCreate from 'components/UserSettingCreate/UserSettingCreate'
import UserSettingDelete from 'components/UserSettingDelete/UserSettingDelete'
import CenteredSpinner from 'shared/CenteredSpinner/CenteredSpinner'
// qraphql
import GetSettings from 'store/setting/query.gql'
import { Query } from 'react-apollo'

export default props => (
  <PageLayout isUserLoggedIn={props.isUserLoggedIn} rootPath={props.rootPath}>
    <ContentBox>
      <H1 context="page">Einstellungen</H1>

      <Query query={GetSettings}>
        {({ loading, error, data }) => {
          if (loading) return <CenteredSpinner />
          if (error) return `Error! ${error.message}`
          // We are getting the userSettings as props
          // Because we are just using booleans for the settings value so far, we are able to use only checkboxes
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

      <ActionRow>
        <Button clickAction={props.clearLocalStorage} context="secondary">
          Abmelden
        </Button>
      </ActionRow>
    </ContentBox>
  </PageLayout>
)
