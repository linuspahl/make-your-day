// libraries
import React from 'react'
// components
import ContentBox from 'shared/ContentBox/ContentBox'
import FadeTransition from 'shared/FadeTransition/FadeTransition'
import H1 from 'shared/H1/H1'
import LoginForm from 'components/LoginForm/LoginForm'
import PageLayout from 'components/PageLayout/PageLayout'

const Layout = props => (
  <PageLayout userSession={props.userSession} rootPath={props.rootPath}>
    <ContentBox>
      <FadeTransition>
        <H1 context="page">Anmeldung</H1>

        <LoginForm
          updateLocalStorage={props.updateLocalStorage}
          createNotificationBanner={props.createNotificationBanner}
        />
      </FadeTransition>
    </ContentBox>
  </PageLayout>
)

export default Layout
