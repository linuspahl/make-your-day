// libraries
import React from 'react'
import styled from 'styled-components'
import { Mutation } from 'react-apollo'
// compoents
import Button from 'shared/Button/Button'
import Icon from 'shared/Icon/Icon'
// graphql
import { DeleteUserSession } from 'store/userSession/mutation'

const IconWrapper = styled.div`
  margin-left: 5px;
  font-size: 20px;
`

const LogoutButton = props => {
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

const handleClick = action => {
  if (confirm(`Wirklich abmelden?`)) {
    action()
  }
}

const handleCompleted = (data, createNotificationBanner, clearLocalStorage) => {
  if (data.deleteUserSession) {
    clearLocalStorage()
    // Inform user about success
    createNotificationBanner({
      type: 'success',
      message: `Erfolgreich abgemeldet`,
    })
  }
}

const handleError = (createNotificationBanner, clearLocalStorage) => {
  clearLocalStorage()
  createNotificationBanner({
    type: 'error',
    message: 'Sitzung konnte auf dem Sevrer nicht gelöscht werden',
  })
}

export default LogoutButton
