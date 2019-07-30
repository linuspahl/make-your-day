// libraries
import * as React from 'react'
import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import { handleInputChange, logError } from 'utils/utils'
import { ApolloError } from 'apollo-boost'
// components
import ActionRow from 'shared/form/ActionRow/ActionRow'
import Button from 'shared/Button/Button'
import Input from 'shared/form/Input/Input'
import Row from 'shared/form/Row/Row'
// graphql
import { LoginUser } from 'store/userSession/mutation'
// interfaces
import { LocalStorage, InputEvent, NotificationCreate } from 'types/types'
import { UserSession } from 'store/userSession/type'
import { UserSetting } from 'store/userSetting/type'

export const Form = styled.form`
  margin-top: ${(props): string => `${props.theme.padding}rem`};
`

interface Props {
  createNotificationBanner: (norification: NotificationCreate) => void
  updateLocalStorage: (localStorage: LocalStorage) => void
}

interface State {
  username: string
  password: string
}

export default class LoginForm extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props)

    this.state = { username: '', password: '' }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleCompleted = this.handleCompleted.bind(this)
    this.handleError = this.handleError.bind(this)
  }

  public render(): JSX.Element {
    const { username, password } = this.state
    return (
      <Mutation
        mutation={LoginUser}
        variables={{ username, password, device: navigator.platform }}
        onCompleted={this.handleCompleted}
        onError={this.handleError}
      >
        {(loginUser: () => void): JSX.Element => (
          <Form onSubmit={(event): void => this.handleSubmit(event, loginUser)}>
            <Row htmlFor="username">
              Username
              <Input
                id="username"
                name="username"
                onChange={this.handleInputChange}
                required
                tabIndex={1}
                value={username}
              />
            </Row>
            <Row htmlFor="password">
              Password
              <Input
                id="password"
                name="password"
                onChange={this.handleInputChange}
                required
                tabIndex={1}
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

  private handleInputChange(event: InputEvent): void {
    handleInputChange(event, this.setState.bind(this))
  }

  private handleSubmit(event: React.FormEvent, loginUser: () => void): void {
    event.preventDefault()
    loginUser()
  }

  private handleCompleted(data: {
    loginUser: {
      id: number
      role: string
      userSession: UserSession
      userSettings: UserSetting[]
    }
  }): void {
    const {
      loginUser: { userSession, id: userId, userSettings = [] },
    } = data
    const { updateLocalStorage } = this.props
    const settings = this.formatUserSettings(userSettings)
    // Update local storage / app state reset  with received user data
    // App will redirect when authToken and userId is defined in app state
    if (userSession && userSession.token) {
      updateLocalStorage({
        authToken: userSession.token,
        userId,
        userSessionId: userSession.id,
        expiresAt: userSession.expiresAt,
        ...settings,
      })
    }
  }

  private formatUserSettings(
    userSettings: UserSetting[] = []
  ): { [key: string]: string } {
    // Part of the login is to update the localstorage with the received user settings, like the night mode.
    // For this case we need to format the settings in a {key: value} format
    return userSettings.reduce(
      (
        result: { [key: string]: string },
        userSetting
      ): { [key: string]: string } => {
        const {
          value,
          setting: { type },
        } = userSetting

        result[type] = value

        return result
      },
      {}
    )
  }

  private handleError(error?: ApolloError): void {
    this.props.createNotificationBanner({
      type: 'error',
      message: 'Anmeldung fehlgeschlagen',
    })
    logError(error)
  }
}
