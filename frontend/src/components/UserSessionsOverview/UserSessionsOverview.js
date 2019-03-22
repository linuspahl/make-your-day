// libraries
import React, { Fragment } from 'react'
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
import { GetUserSessions } from 'store/user/query.gql'
import { DeleteUserSession } from 'store/user/mutation.gql'
import { deleteUserSession } from 'store/user/update'

const UserSessionOverview = props => (
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
              {data.getUserSessions.map(userSession => {
                const isCurrentSession =
                  parseInt(userSession.expiresAt, 10) ===
                  props.userSession.expiresAt
                const expiresAtDate = getDateString(
                  formatUnixDate(userSession.expiresAt)
                )
                return (
                  <Fragment key={userSession.id}>
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
                          id={userSession.id}
                          mutation={DeleteUserSession}
                          onUpdate={deleteUserSession}
                        />
                      )}
                    </GridCell>
                  </Fragment>
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
