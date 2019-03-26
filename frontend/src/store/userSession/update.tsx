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
) => {
  const {
    data: { deleteUserSession },
  } = result

  try {
    if (deleteUserSession) {
      const userSessionsQuery: {getUserSessions: Array<UserSession>} = cache.readQuery({ query: GetUserSessions })

      if (userSessionsQuery.getUserSessions) {
        const updatedUserSessions = userSessionsQuery.getUserSessions.filter(
          userSessions => {
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
