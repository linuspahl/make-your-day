// libraries
import * as React from 'react'
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
    message: 'Sitzung konnte nicht in der Datenbank gelöscht werden',
  })
}

interface Props {
  clearLocalStorage: () => void
  createNotificationBanner: (notification: NotificationCreate) => void
  userSessionId: number
}

const LogoutIcon = (props: Props): React.ReactElement => {
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
        <Wrapper onClick={() => handleClick(perfomMutation)}>
          <Icon title="sign-out" />
        </Wrapper>
      )}
    </Mutation>
  )
}

export default LogoutIcon
