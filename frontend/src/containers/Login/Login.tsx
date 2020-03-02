// libraries
import React from 'react'
// components
import { Wrapper } from './styles'
import ContentBox from 'shared/ContentBox/ContentBox'
import FadeTransition from 'shared/FadeTransition/FadeTransition'
import H1 from 'shared/H1/H1'
import LoginForm from 'components/LoginForm/LoginForm'

const Login = (): JSX.Element => (
  <FadeTransition fullWidth fullHeight>
    <Wrapper>
      <ContentBox role="main" context="page">
        <H1 context="page">Anmeldung</H1>
        <LoginForm />
      </ContentBox>
    </Wrapper>
  </FadeTransition>
)

export default Login
