// libraries
import React from 'react'

// components
import H1 from 'shared/H1/H1'
import PageLayout from 'components/PageLayout/PageLayout'
import ContentBox from 'shared/ContentBox/ContentBox'
import LoginForm from 'components/LoginForm/LoginForm'

export default props => (
  <PageLayout>
    <ContentBox>
      <H1 context="page">Anmeldung</H1>
      <LoginForm updateLocalStorage={props.updateLocalStorage} />
    </ContentBox>
  </PageLayout>
)
