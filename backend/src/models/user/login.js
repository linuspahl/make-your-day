// Login function, will create an auth token on success

import bcrypt from 'bcrypt-nodejs'
import crypto from 'crypto'

export default (User, { username, password }) => {
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
      return updateToken(User, user.id, token)
    })
    .then(() => {
      console.log('token', token)
      // Return UserLogin type
      return {
        token,
        id: user.id,
        role: user.role,
      }
    })
    .catch(error => {
      console.log('error', error)
    })
}

const validatePassword = (password, passwordHash) => {
  return bcrypt.compareSync(password, passwordHash)
}

const createToken = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(16, (err, data) => {
      err ? reject(err) : resolve(data.toString('base64'))
    })
  })
}

const updateToken = (User, id, token) => {
  return User.update({ token }, { where: { id } })
}
