// checkAccess will check if a user is allowed to execute a resolver
export default (models, authToken, restrictedRoles = []) => {
  const { UserSession, User } = models

  return UserSession.findOne({
    where: {
      token: authToken,
    },
    include: [{ model: User, where: { role: { ['$in']: restrictedRoles } } }],
  })
    .then(userSession => {
      if (
        !Boolean(userSession) ||
        !Boolean(userSession.dataValues) ||
        !Boolean(userSession.dataValues.user)
      ) {
        throw Error('User not authorized')
      }

      return userSession.dataValues.user
    })
    .catch(error => console.log('Error: check access', error))
}
