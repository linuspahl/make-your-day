// libraries
import React, { useContext } from 'react'
import { Mutation } from 'react-apollo'
import { ApolloError } from 'apollo-boost'
// utils
import { logError } from 'utils/utils'
// compoents
import { IconWrapper } from './styles'
import Button from 'shared/Button/Button'
import Icon from 'shared/Icon/Icon'
// contexts
import AppContext from 'contexts/AppContext'
// graphql
import { DeleteUserSession } from 'store/userSession/mutation'
// interfaces
import { NotificationCreate } from 'types/types'

const handleClick = (action: () => void): void => {
  if (confirm(`Wirklich abmelden?`)) {
    action()
  }
}

const onLogoutComplete = (
  data: { deleteUserSession: boolean },
  createNotificationBanner: (notification: NotificationCreate) => void,
  clearLocalStorage: () => void
): void => {
  if (data.deleteUserSession) {
    clearLocalStorage()
    // Inform user about success
    createNotificationBanner({
      type: 'success',
      message: 'Erfolgreich abgemeldet',
    })
  }
}

const onLogoutError = (
  error: ApolloError,
  createNotificationBanner: (notification: NotificationCreate) => void,
  clearLocalStorage: () => void
): void => {
  clearLocalStorage()
  createNotificationBanner({
    type: 'error',
    message: 'Sitzung konnte auf dem Server nicht gelöscht werden',
  })
  logError(error)
}

interface Props {
  userSessionId: string
  clearLocalStorage: () => void
}

const LogoutButton = ({
  userSessionId,
  clearLocalStorage,
}: Props): JSX.Element => {
  const { createNotificationBanner } = useContext(AppContext)
  const variables = { id: userSessionId }
  const handleLogoutComplete = (data: { deleteUserSession: boolean }): void =>
    onLogoutComplete(data, createNotificationBanner, clearLocalStorage)
  const handleLogoutError = (error: ApolloError): void =>
    onLogoutError(error, createNotificationBanner, clearLocalStorage)

  return (
    <Mutation
      mutation={DeleteUserSession}
      variables={variables}
      onCompleted={handleLogoutComplete}
      onError={handleLogoutError}
    >
      {(perfomMutation: () => void): JSX.Element => (
        <Button
          context="secondary"
          clickAction={(): void => handleClick(perfomMutation)}
        >
          Abmelden
          <IconWrapper>
            <Icon title="sign-out" />
          </IconWrapper>
        </Button>
      )}
    </Mutation>
  )
}

export default LogoutButton
