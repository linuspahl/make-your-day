// libraries
import React from 'react'
import styled from 'styled-components'
// components
import PageLayout from 'components/PageLayout/PageLayout'
import ContentBox from 'shared/ContentBox/ContentBox'
import H1 from 'shared/H1/H1'
import Button from 'shared/Button/Button'
import ErrorMessage from 'shared/ErrorMessage/ErrorMessage'
import ActionRow from 'shared/form/ActionRow/ActionRow'

export const Layout = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 70px 1fr;
`

export default props => (
  <PageLayout isUserLoggedIn={props.isUserLoggedIn} rootPath={props.rootPath}>
    <ContentBox>
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
  </PageLayout>
)
