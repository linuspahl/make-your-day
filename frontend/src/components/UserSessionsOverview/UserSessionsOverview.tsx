// libraries
import React from 'react'
// utils
import dayjs from 'dayjs'
// components
import DeleteIcon from 'shared/list/DeleteIcon/DeleteIcon'
import LogoutIcon from 'shared/list/LogoutIcon/LogoutIcon'
import H1 from 'shared/H1/H1'
import Grid from 'shared/grid/Grid/Grid'
import GridHead from 'shared/grid/GridHead/GridHead'
import GridBody from 'shared/grid/GridBody/GridBody'
import GridCell from 'shared/grid/GridCell/GridCell'
import PageQueryHandler from 'shared/PageQueryHandler/PageQueryHandler'
// qraphql
import { GetUserSessions } from 'store/userSession/query'
import { DeleteUserSession } from 'store/userSession/mutation'
import { deleteUserSession } from 'store/userSession/update'
// interface
import { UserSession } from 'store/userSession/type'
import { NotificationCreate } from 'types/types'
import ActionIconWrapper from 'shared/list/ActionIconWrapper/ActionIconWrapper'

interface Props {
  clearLocalStorage: () => void
  createNotificationBanner: (notification: NotificationCreate) => void
  currentUserSession: UserSession
}

interface PageQueryResult {
  data: { getUserSessions: UserSession[] }
  status: { getUserSessions: JSX.Element }
}

const UserSessionOverview = ({
  clearLocalStorage,
  createNotificationBanner,
  currentUserSession,
}: Props): JSX.Element => (
  <PageQueryHandler
    dataTestId="UserSessionsOverview"
    errorMessages={{
      getUserSessions: 'Andere Sitzungen konnten nicht geladen werden',
    }}
    query={GetUserSessions}
    queryNames={['getUserSessions']}
  >
    {({
      data: { getUserSessions: userSessions },
      status: { getUserSessions: userSessionsQueryStatus },
    }: PageQueryResult): JSX.Element => {
      return (
        <>
          <H1 context="page">Angemeldete Geräte</H1>
          {userSessionsQueryStatus}
          {!userSessionsQueryStatus && userSessions && (
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
                        clearLocalStorage={clearLocalStorage}
                        createNotificationBanner={createNotificationBanner}
                        isCurrentSession={
                          userSession.expiresAt === currentUserSession.expiresAt
                        }
                        key={userSession.id}
                        userSession={userSession}
                      />
                    )
                  }
                )}
              </GridBody>
            </Grid>
          )}
        </>
      )
    }}
  </PageQueryHandler>
)

interface ListItemProps {
  clearLocalStorage: () => void
  isCurrentSession: boolean
  userSession: UserSession
}

const ListItem = ({
  clearLocalStorage,
  isCurrentSession,
  userSession,
}: ListItemProps): JSX.Element => {
  const expiresAtDate = dayjs(userSession.expiresAt).format('YYYY-MM-DD')
  return (
    <>
      <div>{userSession.device}</div>
      <div>{expiresAtDate}</div>
      <GridCell justify="flex-end">
        <ActionIconWrapper>
          {isCurrentSession && (
            <LogoutIcon
              userSessionId={userSession.id}
              clearLocalStorage={clearLocalStorage}
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
        </ActionIconWrapper>
      </GridCell>
    </>
  )
}

export default UserSessionOverview
