import checkAccess from '../checkAccess'

export default (parent, args, { models, authToken }) =>
  checkAccess(models, authToken).then(user =>
    models.UserSession.findAll({ where: { userId: user.id } })
  )
