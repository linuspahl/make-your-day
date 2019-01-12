// libraries
import React, { Fragment } from 'react'
import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { handleInputChange } from 'utils/utils'
// components
import Input from 'shared/form/Input/Input'
import Row from 'shared/form/Row/Row'
import ActionRow from 'shared/form/ActionRow/ActionRow'
import Button from 'shared/Button/Button'
// graphql
import { LoginUser } from 'store/user/mutation.gql'

export const Form = styled.form`
  margin-top: 15px;
`

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { username: '', password: '' }

    this.handleInputChange = event => {
      handleInputChange(event, this.setState.bind(this))
    }

    this.submitCompleted = async data => {
      const {
        loginUser: { token: authToken, id: userId, role: userRole, nightMode },
      } = data
      const { updateLocalStorage, history } = this.props
      // Update local storage / app state reset  with received user data
      // App will redirect when authToken and userId is defined in app state
      if (authToken) {
        updateLocalStorage({
          authToken,
          userId,
          userRole,
        })
      }
    }

    this.onError = error => {
      this.props.createNotificationBanner({
        type: 'error',
        message: 'Anmeldung fehlgeschlagen',
      })
    }
  }

  handleSubmit(event, loginUser) {
    event.preventDefault()
    loginUser()
  }

  render() {
    const { username, password } = this.state
    return (
      <Mutation
        mutation={LoginUser}
        variables={{ username, password }}
        onCompleted={data => this.submitCompleted(data)}
        onError={error => this.onError(error)}
      >
        {loginUser => (
          <Form onSubmit={event => this.handleSubmit(event, loginUser)}>
            <Row>
              Username
              <Input
                name="username"
                onChange={this.handleInputChange}
                required
                value={username}
              />
            </Row>
            <Row>
              Password
              <Input
                name="password"
                onChange={this.handleInputChange}
                required
                type="password"
                value={password}
              />
            </Row>
            <ActionRow>
              <Button type="submit" context="primary">
                Anmelden
              </Button>
            </ActionRow>
          </Form>
        )}
      </Mutation>
    )
  }
}
