// libraries
import * as React from 'react'
import styled from 'styled-components'
// components
import ContentBox from 'shared/ContentBox/ContentBox'
import FadeTransition from 'shared/FadeTransition/FadeTransition'
import H1 from 'shared/H1/H1'
import LoginForm from 'components/LoginForm/LoginForm'
// interfaces
import { UserSession } from 'store/userSession/type'
import { NotificationCreate, LocalStorage } from 'types/types'

const Wrapper = styled.div`
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: ${(props): number => props.theme.dimensions.padding}px;
`
interface Props {
  createNotificationBanner: (notification: NotificationCreate) => void
  rootPath: string
  updateLocalStorage: (localStorage: LocalStorage) => void
  userSession: UserSession
}

const Layout = (props: Props): JSX.Element => (
  <Wrapper>
    <FadeTransition fullWidth>
      <ContentBox role="main">
        <H1 context="page">Anmeldung</H1>
        <LoginForm
          updateLocalStorage={props.updateLocalStorage}
          createNotificationBanner={props.createNotificationBanner}
        />
      </ContentBox>
    </FadeTransition>
  </Wrapper>
)

export default Layout
