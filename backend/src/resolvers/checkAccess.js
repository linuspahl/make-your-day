// checkAccess will check if a user is allowed to execute a resolver
export default (models, authToken, restrictedRoles = []) => {
  const { User } = models

  return User.findOne({
    where: {
      token: authToken,
      ['$and']: { role: { ['$in']: restrictedRoles } },
    },
  })
    .then(user => {
      if (!Boolean(user)) {
        throw Error('User not authorized')
      }
      return user
    })
    .catch(error => console.log('Error: check access', error))
}
