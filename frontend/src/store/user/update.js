// graphql
import { GetUserSessions } from 'store/user/query.gql'

export const deleteUserSession = (cache, result, variables) => {
  const {
    data: { deleteUserSession },
  } = result

  try {
    if (deleteUserSession) {
      const userSessionsQuery = cache.readQuery({ query: GetUserSessions })
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
  } catch {}
}
