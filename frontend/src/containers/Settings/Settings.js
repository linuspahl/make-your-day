// libraries
import React from 'react'
import { Query } from 'react-apollo'
// components
import ActionRow from 'shared/form/ActionRow/ActionRow'
import Button from 'shared/Button/Button'
import CenteredSpinner from 'shared/CenteredSpinner/CenteredSpinner'
import ContentBox from 'shared/ContentBox/ContentBox'
import FadeTransition from 'shared/FadeTransition/FadeTransition'
import H1 from 'shared/H1/H1'
import PageLayout from 'components/PageLayout/PageLayout'
import Row from 'shared/form/Row/Row'
import UserSettingCreate from 'components/UserSettingCreate/UserSettingCreate'
import UserSettingDelete from 'components/UserSettingDelete/UserSettingDelete'
// qraphql
import GetSettings from 'store/setting/query.gql'

export default props => (
  <PageLayout isUserLoggedIn={props.isUserLoggedIn} rootPath={props.rootPath}>
    <ContentBox>
      <FadeTransition>
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
      </FadeTransition>
    </ContentBox>
  </PageLayout>
)
