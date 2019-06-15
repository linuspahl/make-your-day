// libraries
import * as React from 'react'
// utils
import dayjs from 'dayjs'
// components
import DeleteIcon from 'shared/list/DeleteIcon/DeleteIcon'
import LogoutIcon from 'shared/list/LogoutIcon/LogoutIcon'
import H1 from 'shared/H1/H1'
import FadeTransition from 'shared/FadeTransition/FadeTransition'
import Grid from 'shared/grid/Grid/Grid'
import GridHead from 'shared/grid/GridHead/GridHead'
import GridBody from 'shared/grid/GridBody/GridBody'
import GridCell from 'shared/grid/GridCell/GridCell'
import QueryStateHandler from 'shared/QueryStateHandler/QueryStateHandler'
// qraphql
import { GetUserSessions } from 'store/userSession/query'
import { DeleteUserSession } from 'store/userSession/mutation'
import { deleteUserSession } from 'store/userSession/update'
// interface
import { UserSession } from 'store/userSession/type'
import { NotificationCreate } from 'types/types'

interface Props {
  clearLocalStorage: () => void
  createNotificationBanner: (notification: NotificationCreate) => void
  currentUserSession: UserSession
}

const UserSessionOverview = (props: Props): JSX.Element => (
  <FadeTransition>
    <H1 context="page">Angemeldete Geräte</H1>
    <QueryStateHandler
      errorMessage="Andere Sitzungen konnten nicht geladen werden"
      query={GetUserSessions}
      queryName="getUserSessions"
    >
      {(userSessions: UserSession[]): JSX.Element => {
        return (
          <Grid>
            <GridHead>
              <GridCell>Gerät</GridCell>
              <GridCell>Gültig bis</GridCell>
              <GridCell />
            </GridHead>
            <GridBody columnAmount={3}>
              {userSessions.map(
                (userSession: UserSession): JSX.Element => {
                  return (
                    <ListItem
                      clearLocalStorage={props.clearLocalStorage}
                      createNotificationBanner={props.createNotificationBanner}
                      isCurrentSession={
                        userSession.expiresAt ===
                        props.currentUserSession.expiresAt
                      }
                      key={userSession.id}
                      userSession={userSession}
                    />
                  )
                }
              )}
            </GridBody>
          </Grid>
        )
      }}
    </QueryStateHandler>
  </FadeTransition>
)

const ListItem = (props: {
  clearLocalStorage: () => void
  createNotificationBanner: (notification: NotificationCreate) => void
  isCurrentSession: boolean
  userSession: UserSession
}): JSX.Element => {
  const { userSession, isCurrentSession } = props
  const expiresAtDate = dayjs(userSession.expiresAt).format('YYYY-MM-DD')
  return (
    <React.Fragment key={userSession.id}>
      <div>{userSession.device}</div>
      <div>{expiresAtDate}</div>
      <GridCell justify="flex-end">
        {isCurrentSession && (
          <LogoutIcon
            userSessionId={userSession.id}
            clearLocalStorage={props.clearLocalStorage}
            createNotificationBanner={props.createNotificationBanner}
          />
        )}
        {!isCurrentSession && (
          <DeleteIcon
            ariaLabel={`Sitzung von ${userSession.device} entfernen`}
            title="Sitzung"
            id={userSession.id}
            mutation={DeleteUserSession}
            onUpdate={deleteUserSession}
          />
        )}
      </GridCell>
    </React.Fragment>
  )
}

export default UserSessionOverview
