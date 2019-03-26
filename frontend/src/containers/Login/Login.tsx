// libraries
import * as React from 'react'
// components
import ContentBox from 'shared/ContentBox/ContentBox'
import FadeTransition from 'shared/FadeTransition/FadeTransition'
import H1 from 'shared/H1/H1'
import LoginForm from 'components/LoginForm/LoginForm'
import PageLayout from 'components/PageLayout/PageLayout'
// interfaces
import { UserSession } from 'store/userSession/type'
import { NotificationCreate, LocalStorage } from 'types/types'

interface Props {
  createNotificationBanner: (notification: NotificationCreate) => void
  rootPath: string
  updateLocalStorage: (localStorage: LocalStorage) => void
  userSession: UserSession
}

const Layout = (props: Props) => (
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
