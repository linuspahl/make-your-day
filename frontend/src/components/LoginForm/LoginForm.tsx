// libraries
import React, { useState, useContext } from 'react'
import { Mutation } from 'react-apollo'
import { ApolloError } from 'apollo-boost'
// utils
import { logError } from 'utils/utils'
// components
import ActionRow from 'shared/form/ActionRow/ActionRow'
import Button from 'shared/Button/Button'
import Input from 'shared/form/Input/Input'
import Row from 'shared/form/Row/Row'
// contexts
import AppContext from 'contexts/AppContext'
// graphql
import { LoginUser } from 'store/userSession/mutation'
// interfaces
import { LocalStorageCreate, InputEvent, NotificationCreate } from 'types/types'
import { UserSession } from 'store/userSession/type'
import { UserSetting } from 'store/userSetting/type'

interface SubmitResponse {
  loginUser: {
    id: string
    role: string
    userSession: UserSession
    userSettings: UserSetting[]
  }
}

const onFormSubmit = (event: React.FormEvent, loginUser: () => void): void => {
  event.preventDefault()
  loginUser()
}

const formatUserSettings = (
  userSettings: UserSetting[] = []
): { [key: string]: string } => {
  // Part of the login is to update the localstorage with the received user settings, like the night mode.
  // For this case we need to format the settings in a {key: value} format
  return userSettings.reduce((result: { [key: string]: string }, userSetting): {
    [key: string]: string
  } => {
    const {
      value,
      setting: { type },
    } = userSetting

    result[type] = value

    return result
  }, {})
}

const formSubmitCompleted = (
  data: SubmitResponse,
  updateLocalStorage: (nestStore: LocalStorageCreate) => void
): void => {
  const {
    loginUser: { userSession, id: userId, userSettings = [] },
  } = data
  const settings = formatUserSettings(userSettings)
  // Update local storage / app state reset  with received user data
  // App will redirect when authToken and userId is defined in app state
  if (userSession && userSession.token) {
    updateLocalStorage({
      authToken: userSession.token,
      userId,
      userSessionId: userSession.id,
      expiresAt: String(userSession.expiresAt),
      ...settings,
    })
  }
}

const onSubmitError = (
  error: ApolloError,
  createNotificationBanner: (notification: NotificationCreate) => void
): void => {
  createNotificationBanner({
    type: 'error',
    message: 'Anmeldung fehlgeschlagen',
  })
  logError(error)
}

const useFormInput = (
  initialValue: string
): {
  value: string
  onChange: (e: InputEvent) => void
} => {
  const [value, setValue] = useState(initialValue)

  const handleChange = (event: InputEvent): void =>
    setValue(String(event.target.value))

  return {
    value,
    onChange: handleChange,
  }
}

const LoginForm = (): JSX.Element => {
  const { createNotificationBanner, updateLocalStorage } = useContext(
    AppContext
  )
  const username = useFormInput('')
  const password = useFormInput('')
  const handleFormSubmitComplete = (data: SubmitResponse): void =>
    formSubmitCompleted(data, updateLocalStorage)
  const handleSubmitError = (error: ApolloError): void =>
    onSubmitError(error, createNotificationBanner)

  return (
    <Mutation
      mutation={LoginUser}
      variables={{
        username: username.value,
        password: password.value,
        device: navigator.platform,
      }}
      onCompleted={handleFormSubmitComplete}
      onError={handleSubmitError}
    >
      {(loginUser: () => void): JSX.Element => (
        <form onSubmit={(event): void => onFormSubmit(event, loginUser)}>
          <Row htmlFor="username">
            <Input
              id="username"
              label="Username"
              name="username"
              required
              tabIndex={1}
              {...username}
            />
          </Row>
          <Row htmlFor="password">
            <Input
              id="password"
              label="Password"
              name="password"
              required
              tabIndex={1}
              type="password"
              {...password}
            />
          </Row>
          <ActionRow>
            <Button type="submit" context="primary">
              Anmelden
            </Button>
          </ActionRow>
        </form>
      )}
    </Mutation>
  )
}

export default LoginForm
