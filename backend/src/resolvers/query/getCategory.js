import checkAccess from '../checkAccess'

export default (parent, { id }, { models, authToken }) =>
  checkAccess(models, authToken).then(user =>
    models.Category.findOne({ where: { id, userId: user.id } })
  )
