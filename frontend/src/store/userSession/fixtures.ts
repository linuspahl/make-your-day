// interfaces
import { UserSession } from 'store/userSession/type'
// graphql
import { LoginUser } from 'store/userSession/mutation'
import { DeleteUserSession } from 'store/userSession/mutation'
import { GetUserSessions } from 'store/userSession/query'

export const userSession: UserSession = {
  id: 1,
  userId: 1,
  token: 'TOKEN1',
  device: 'Mac',
  expiresAt: 1560248192861, // unix date with ms
  createdAt: 1560248190861,
}

export const userSession2: UserSession = {
  ...userSession,
  id: 2,
  token: 'TOKEN2',
  expiresAt: 1560248192845, // unix date with ms
  createdAt: 1560248190845,
}

// Api stubs
const loginUserRequest = {
  request: {
    query: LoginUser,
    variables: {
      username: 'Username 1',
      password: 'Password 1',
      device: 'Mac',
    },
  },
}
export const loginUserSuccess = {
  ...loginUserRequest,
  result: {
    data: {
      loginUser: {
        id: userSession.id,
        token: userSession.userId,
        role: 'Admin',
        userSettings: [
          {
            value: true,
            setting: {
              type: 'nightmode',
            },
          },
        ],
        userSession: {
          id: userSession.id,
          token: userSession.token,
          expiresAt: userSession.expiresAt,
          createdAt: userSession.createdAt,
        },
      },
    },
  },
}

export const loginUserError = {
  ...loginUserRequest,
  error: new Error('loginUser failed'),
}

const getUserSessionsRequest = {
  request: {
    query: GetUserSessions,
  },
}
export const getUserSessionsSuccess = {
  ...getUserSessionsRequest,
  result: {
    data: {
      getUserSessions: [userSession, userSession2],
    },
  },
}

export const getUserSessionsError = {
  ...getUserSessionsRequest,
  error: new Error('getUserSessions failed'),
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
