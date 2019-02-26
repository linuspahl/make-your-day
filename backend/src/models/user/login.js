// Login function, will create an auth token on success

import bcrypt from 'bcrypt-nodejs'
import crypto from 'crypto'

export default (models, { username, password, device }) => {
  const { User, UserSession } = models
  let user
  let token

  // Find user with the provided username
  return User.findOne({ where: { username } })
    .then(matchigUser => {
      // Set user object reference for further usage
      user = matchigUser
      // Throw error when there is no user with the username
      if (!user) {
        throw new Error('Username or Password invalid')
      }
      // Validate users password
      if (!validatePassword(password, user.passwordHash)) {
        throw new Error('Username or Password invalid')
      }
      // Create random token
      return createToken()
    })
    .then(createdToken => {
      // Set token object reference for further usage
      token = createdToken
      // Set generate token as user auth token
      return setToken(UserSession, user.id, token, device)
    })
    .then(() => {
      // We need to return the user query again, to be able to work dynamically together with the graphql schema
      // This means we can't return the needed attributes in a static way
      return User.findOne({
        where: { id: user.id },
      })
    })
    .catch(error => {
      console.log('Error: user login', error)
    })
}

// Compare login password with user password hash
const validatePassword = (password, passwordHash) => {
  return bcrypt.compareSync(password, passwordHash)
}

// Create session token after successful login
const createToken = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(16, (error, data) => {
      error ? reject(error) : resolve(data.toString('base64'))
    })
  })
}

// Set auth token
const setToken = (UserSession, userId, token, device) => {
  var today = new Date()
  const in30Days = today.setDate(today.getDate() + 30)
  return UserSession.create({
    token,
    userId,
    expiresAt: in30Days,
    device,
  })
}
