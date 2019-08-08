// libraries
import * as React from 'react'
import { Mutation } from 'react-apollo'
// compoents
import { IconWrapper } from './styles'
import Button from 'shared/Button/Button'
import Icon from 'shared/Icon/Icon'
// graphql
import { DeleteUserSession } from 'store/userSession/mutation'
// interfaces
import { Notification, NotificationCreate } from 'types/types'

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
  if (data.deleteUserSession) {
    clearLocalStorage()
    // Inform user about success
    createNotificationBanner({
      type: 'success',
      message: 'Erfolgreich abgemeldet',
    })
  }
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
  userSessionId: string
  clearLocalStorage: () => void
  createNotificationBanner: (notification: Notification) => void
}

const LogoutButton = (props: Props): JSX.Element => {
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
