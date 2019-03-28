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
      message: `Erfolgreich abgemeldet`,
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
    message: 'Sitzung konnte auf dem Sevrer nicht gelöscht werden',
  })
}

interface Props {
  userSessionId: number
  clearLocalStorage: () => void
  createNotificationBanner: (notification: Notification) => void
}

const LogoutButton = (props: Props): React.ReactElement => {
  const { userSessionId, clearLocalStorage, createNotificationBanner } = props
  const variables = { id: userSessionId }

  return (
    <Mutation
      mutation={DeleteUserSession}
      variables={variables}
      onCompleted={data =>
        handleCompleted(data, createNotificationBanner, clearLocalStorage)
      }
      onError={() => handleError(createNotificationBanner, clearLocalStorage)}
    >
      {perfomMutation => (
        <Button
          context="secondary"
          clickAction={() => handleClick(perfomMutation)}
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
