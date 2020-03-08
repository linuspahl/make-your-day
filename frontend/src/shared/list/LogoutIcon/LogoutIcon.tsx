// libraries
import React, { useContext } from 'react'
import { Mutation } from 'react-apollo'
import { ApolloError } from 'apollo-boost'
// components
import { Wrapper } from './styles'
import Icon from 'shared/Icon/Icon'
// contexts
import AppContext from 'contexts/AppContext'
// graphql
import { DeleteUserSession } from 'store/userSession/mutation'
// interfaces
import { NotificationCreate } from 'types/types'
import { logError } from 'utils/utils'

const handleClick = (action: () => void): void => {
  if (confirm(`Wirklich abmelden?`)) {
    action()
  }
}

const handleLogoutComplete = (
  createNotificationBanner: (notification: NotificationCreate) => void,
  clearLocalStorage: () => void
): void => {
  clearLocalStorage()
  // Inform user about success
  createNotificationBanner({
    type: 'success',
    message: `Erfolgreich abgemeldet`,
  })
}

const handleLogoutError = (
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
  clearLocalStorage: () => void
  userSessionId: string
}

const LogoutIcon = (props: Props): JSX.Element => {
  const { userSessionId, clearLocalStorage } = props
  const { createNotificationBanner } = useContext(AppContext)
  const variables = { id: userSessionId }

  const onLogoutComplete = (): void =>
    handleLogoutComplete(createNotificationBanner, clearLocalStorage)
  const onLogoutError = (error: ApolloError): void =>
    handleLogoutError(error, createNotificationBanner, clearLocalStorage)

  return (
    <Mutation
      mutation={DeleteUserSession}
      variables={variables}
      onCompleted={onLogoutComplete}
      onError={onLogoutError}
    >
      {(perfomMutation: () => void): JSX.Element => (
        <Wrapper onClick={(): void => handleClick(perfomMutation)}>
          <Icon title="sign-out" />
        </Wrapper>
      )}
    </Mutation>
  )
}

export default LogoutIcon
