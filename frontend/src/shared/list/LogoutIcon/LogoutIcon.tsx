// libraries
import * as React from 'react'
import styled from 'styled-components'
import { Mutation } from 'react-apollo'
// components
import Icon from 'shared/Icon/Icon'
// graphql
import { DeleteUserSession } from 'store/userSession/mutation'
// interfaces
import { NotificationCreate } from 'types/types'

const Wrapper = styled.div`
  height: 40px;
  width: 40px;

  display: flex;
  justify-content: center;
  align-items: center;
  float: left;

  font-size: 26px;
  color: ${props => props.theme.text};
  cursor: pointer;

  &:active {
    background-color: ${props => props.theme.active};
  }
`

interface Props {
  clearLocalStorage: () => void
  createNotificationBanner: (notification: NotificationCreate) => void
  userSessionId: number
}

const LogoutIcon = (props: Props) => {
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

const handleClick = (action: () => void) => {
  if (confirm(`Wirklich abmelden?`)) {
    action()
  }
}

const handleCompleted = (data: { deleteUserSession: boolean }, createNotificationBanner: (notification: NotificationCreate) => void , clearLocalStorage: () => void) => {
  if (data.deleteUserSession) {
    clearLocalStorage()
    // Inform user about success
    createNotificationBanner({
      type: 'success',
      message: `Erfolgreich abgemeldet`,
    })
  }
}

const handleError = (createNotificationBanner: (notification: NotificationCreate) => void, clearLocalStorage: () => void) => {
  clearLocalStorage()
  createNotificationBanner({
    type: 'error',
    message: 'Sitzung konnte nicht in der Datenbank gelöscht werden',
  })
}

export default LogoutIcon