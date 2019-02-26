import checkAccess from '../checkAccess'

export default (parent, { id }, { models, authToken }) =>
  checkAccess(models, authToken).then(user =>
    models.UserSession.destroy({ where: { id, userId: user.id } })
  )
