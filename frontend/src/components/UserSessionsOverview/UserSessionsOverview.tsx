// libraries
import * as React from 'react'
import { Query } from 'react-apollo'
// utils
import { getDateString, formatUnixDate } from 'utils/utils'
// components
import DeleteIcon from 'shared/list/DeleteIcon/DeleteIcon'
import LogoutIcon from 'shared/list/LogoutIcon/LogoutIcon'
import CenteredSpinner from 'shared/CenteredSpinner/CenteredSpinner'
import ErrorMessage from 'shared/ErrorMessage/ErrorMessage'
import H1 from 'shared/H1/H1'
import FadeTransition from 'shared/FadeTransition/FadeTransition'
import Grid from 'shared/grid/Grid/Grid'
import GridHead from 'shared/grid/GridHead/GridHead'
import GridBody from 'shared/grid/GridBody/GridBody'
import GridCell from 'shared/grid/GridCell/GridCell'
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
  userSession: UserSession
}

const UserSessionOverview = (props: Props): React.ReactElement => (
  <FadeTransition>
    <H1 context="page">Angemeldete Geräte</H1>

    <Query query={GetUserSessions}>
      {({ loading, error, data }) => {
        if (loading) return <CenteredSpinner />

        if (error)
          return (
            <ErrorMessage
              error={error}
              message="Andere Sitzungen konnten nicht geladen werden"
            />
          )

        const userSessions: UserSession[] = data.getUserSessions || []

        // We are getting the userSettings as props
        // Because we are just using booleans for the settings value so far, we are able to use only checkboxes
        return (
          <Grid>
            <GridHead>
              <GridCell>Gerät</GridCell>
              <GridCell>Gültig bis</GridCell>
              <GridCell />
            </GridHead>
            <GridBody columnAmount={3}>
              {userSessions.map((userSession: UserSession) => {
                const isCurrentSession =
                  userSession.expiresAt === props.userSession.expiresAt
                const expiresAtDate = getDateString(
                  formatUnixDate(userSession.expiresAt)
                )
                return (
                  <React.Fragment key={userSession.id}>
                    <div>{userSession.device}</div>
                    <div>{expiresAtDate}</div>
                    <GridCell justify="flex-end">
                      {isCurrentSession && (
                        <LogoutIcon
                          userSessionId={userSession.id}
                          clearLocalStorage={props.clearLocalStorage}
                          createNotificationBanner={
                            props.createNotificationBanner
                          }
                        />
                      )}
                      {!isCurrentSession && (
                        <DeleteIcon
                          title="Sitzung"
                          id={userSession.id}
                          mutation={DeleteUserSession}
                          onUpdate={deleteUserSession}
                        />
                      )}
                    </GridCell>
                  </React.Fragment>
                )
              })}
            </GridBody>
          </Grid>
        )
      }}
    </Query>
  </FadeTransition>
)

export default UserSessionOverview
