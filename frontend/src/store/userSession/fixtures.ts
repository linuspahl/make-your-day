// interfaces
import { UserSession } from 'store/userSession/type'
// graphql
import { DeleteUserSession } from 'store/userSession/mutation'
import { GetUserSessions } from 'store/userSession/query'

export const userSession: UserSession = {
  id: 1,
  userId: 1,
  token: 'tokenxy',
  device: 'Mac',
  expiresAt: 1560248192861, // unix date with ms
  createdAt: 1560248190861,
}

// Api stubs

const getUserSessionsRequest = {
  request: {
    query: GetUserSessions,
  },
}
export const getUserSessionsSuccess = {
  ...getUserSessionsRequest,
  result: {
    data: {
      getUserSessions: [userSession],
    },
  },
}

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
