// libraries
import React from 'react'
import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import { handleInputChange } from 'utils/utils'
import { sortBy } from 'utils/utils'
// components
import ActionRow from 'shared/form/ActionRow/ActionRow'
import Button from 'shared/Button/Button'
import Input from 'shared/form/Input/Input'
import Row from 'shared/form/Row/Row'
// graphql
import { LoginUser } from 'store/user/mutation.gql'

export const Form = styled.form`
  margin-top: 15px;
`

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = { username: '', password: '' }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleCompleted = this.handleCompleted.bind(this)
    this.handleError = this.handleError.bind(this)
  }

  render() {
    const { username, password } = this.state
    return (
      <Mutation
        mutation={LoginUser}
        variables={{ username, password, device: navigator.platform }}
        onCompleted={this.handleCompleted}
        onError={this.handleError}
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

  handleInputChange(event) {
    handleInputChange(event, this.setState.bind(this))
  }

  handleSubmit(event, loginUser) {
    event.preventDefault()
    loginUser()
  }

  async handleCompleted(data) {
    const {
      loginUser: { userSession, id: userId, role: userRole, userSettings },
    } = data
    const { updateLocalStorage } = this.props
    const settings = this.formatUserSettings(userSettings)
    // Update local storage / app state reset  with received user data
    // App will redirect when authToken and userId is defined in app state
    if (userSession && userSession.token) {
      updateLocalStorage({
        authToken: userSession.token,
        userId,
        userRole,
        userSessionId: userSession.id,
        expiresAt: userSession.expiresAt,
        ...settings,
      })
    }
  }

  formatUserSettings(userSettings) {
    // Part of the login is to update the localstorage with the received user settings, like the night mode.
    // For this case we need to format the settings in a {key: value} format
    return userSettings.reduce((result, userSetting) => {
      const {
        value,
        setting: { type },
      } = userSetting

      result[type] = value

      return result
    }, {})
  }

  handleError(error) {
    this.props.createNotificationBanner({
      type: 'error',
      message: 'Anmeldung fehlgeschlagen',
    })
  }
}
