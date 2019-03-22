// libraries
import React from 'react'
import styled from 'styled-components'
// components
import ActionRow from 'shared/form/ActionRow/ActionRow'
import Button from 'shared/Button/Button'
import ContentBox from 'shared/ContentBox/ContentBox'
import ErrorMessage from 'shared/ErrorMessage/ErrorMessage'
import FadeTransition from 'shared/FadeTransition/FadeTransition'
import H1 from 'shared/H1/H1.tsx'
import PageLayout from 'components/PageLayout/PageLayout'

export const Layout = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 70px 1fr;
`

const PageNotFound = props => (
  <PageLayout userSession={props.userSession} rootPath={props.rootPath}>
    <ContentBox>
      <FadeTransition>
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
      </FadeTransition>
    </ContentBox>
  </PageLayout>
)

export default PageNotFound
