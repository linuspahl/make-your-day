// libraries
import * as React from 'react'
// components
import ActionRow from 'shared/form/ActionRow/ActionRow'
import Button from 'shared/Button/Button'
import ContentBox from 'shared/ContentBox/ContentBox'
import ErrorMessage from 'shared/ErrorMessage/ErrorMessage'
import FadeTransition from 'shared/FadeTransition/FadeTransition'
import H1 from 'shared/H1/H1'

const PageNotFound = (): JSX.Element => (
  <React.Fragment>
    <FadeTransition fullWidth>
      <ContentBox role="main">
        <H1 context="page">Seite nicht gefunden</H1>
        <ErrorMessage
          message="Die angegeben Adresse konnte nicht"
          error="Error: Route not found"
        />
        <ActionRow>
          <Button context="primary" to="/">
            Zur Startseite
          </Button>
        </ActionRow>
      </ContentBox>
    </FadeTransition>
  </React.Fragment>
)

export default PageNotFound
