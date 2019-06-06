// interfaces
import { UserSession } from 'store/userSession/type'
// graphql
import { DeleteUserSession } from 'store/userSession/mutation'

export const userSession: UserSession = {
  id: 1,
  userId: 1,
  token: 'tokenxy',
  expiresAt: '1553598046', // unix date
  createdAt: '1553598046',
}

// Api stubs
const deleteUserSessionRequest = {
  request: {
    query: DeleteUserSession,
    variables: {
      id: 1,
    },
  },
}
export const deleteUserSessionSuccess = {
  ...deleteUserSessionRequest,
  result: {
    data: {
      deleteUserSession: { id: 1 },
    },
  },
}

export const deleteUserSessionError = {
  ...deleteUserSessionRequest,
  error: new Error('deleteUserSession failed'),
}
