// graphql
import { GetUserSessions } from 'store/userSession/query'
import { DataProxy } from 'apollo-cache'
import { FetchResult } from 'react-apollo'
// interfaces
import { UserSession } from 'store/userSession/type'

export const deleteUserSession = (
  cache: DataProxy,
  result: FetchResult,
  variables: { id: number }
): void => {
  const {
    data: { deleteUserSession },
  } = result

  try {
    if (deleteUserSession) {
      const userSessionsQuery: {
        getUserSessions: UserSession[]
      } = cache.readQuery({ query: GetUserSessions })

      if (userSessionsQuery.getUserSessions) {
        const updatedUserSessions = userSessionsQuery.getUserSessions.filter(
          (userSessions): boolean => {
            return userSessions.id !== variables.id
          }
        )

        cache.writeQuery({
          query: GetUserSessions,
          data: {
            getUserSessions: [...updatedUserSessions],
          },
        })
      }
    }
  } catch {}
}
