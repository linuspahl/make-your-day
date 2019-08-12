// libraries
import React from 'react'
import { Mutation } from 'react-apollo'
// components
import { Wrapper } from './styles'
import Icon from 'shared/Icon/Icon'
// graphql
import { DeleteUserSession } from 'store/userSession/mutation'
// interfaces
import { NotificationCreate } from 'types/types'

const handleClick = (action: () => void): void => {
  if (confirm(`Wirklich abmelden?`)) {
    action()
  }
}

const handleCompleted = (
  data: { deleteUserSession: boolean },
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

const handleError = (
  createNotificationBanner: (notification: NotificationCreate) => void,
  clearLocalStorage: () => void
): void => {
  clearLocalStorage()
  createNotificationBanner({
    type: 'error',
    message: 'Sitzung konnte auf dem Server nicht gelöscht werden',
  })
}

interface Props {
  clearLocalStorage: () => void
  createNotificationBanner: (notification: NotificationCreate) => void
  userSessionId: string
}

const LogoutIcon = (props: Props): JSX.Element => {
  const { userSessionId, clearLocalStorage, createNotificationBanner } = props
  const variables = { id: userSessionId }

  return (
    <Mutation
      mutation={DeleteUserSession}
      variables={variables}
      onCompleted={(data: { deleteUserSession: boolean }): void =>
        handleCompleted(data, createNotificationBanner, clearLocalStorage)
      }
      onError={(): void =>
        handleError(createNotificationBanner, clearLocalStorage)
      }
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
