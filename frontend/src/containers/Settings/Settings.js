// libraries
import React from 'react'
// components
import PageLayout from 'components/PageLayout/PageLayout'
import H1 from 'shared/H1/H1'
import ContentBox from 'shared/ContentBox/ContentBox'
import ActionRow from 'shared/form/ActionRow/ActionRow'
import Button from 'shared/Button/Button'

export default props => (
  <PageLayout isUserLoggedIn={props.isUserLoggedIn} exact>
    <ContentBox context="page">
      <H1 context="page">Einstellungen</H1>
      <ActionRow>
        <Button clickAction={props.clearLocalStorage} context="secondary">
          Abmelden
        </Button>
      </ActionRow>
    </ContentBox>
  </PageLayout>
)
