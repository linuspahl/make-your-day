// libraries
import * as React from 'react'
import styled from 'styled-components'
import { Mutation } from 'react-apollo'
// compoents
import Button from 'shared/Button/Button'
import Icon from 'shared/Icon/Icon'
// graphql
import { DeleteUserSession } from 'store/userSession/mutation'
// interfaces
import { Notification, NotificationCreate } from 'types/types'

const IconWrapper = styled.div`
  margin-left: 5px;
  font-size: 20px;
`

interface Props {
  userSessionId: number
  clearLocalStorage: () => void
  createNotificationBanner: (notification: Notification) => void
}

const LogoutButton = (props: Props) => {
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

const handleClick = (action: () => void) => {
  if (confirm(`Wirklich abmelden?`)) {
    action()
  }
}

const handleCompleted = (
    data: { deleteUserSession: boolean },
    createNotificationBanner: (notification: NotificationCreate) => void,
    clearLocalStorage: () => void
  ) => {
  if (data.deleteUserSession) {
    clearLocalStorage()
    // Inform user about success
    createNotificationBanner({
      type: 'success',
      message: `Erfolgreich abgemeldet`,
    })
  }
}

const handleError = (createNotificationBanner: (notification: NotificationCreate) => void, clearLocalStorage: () => void ) => {
  clearLocalStorage()
  createNotificationBanner({
    type: 'error',
    message: 'Sitzung konnte auf dem Sevrer nicht gelöscht werden',
  })
}

export default LogoutButton
