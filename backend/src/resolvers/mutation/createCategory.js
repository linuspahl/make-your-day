import checkAccess from '../checkAccess'

export default (parent, args, { models, authToken }) =>
  checkAccess(models, authToken).then(user =>
    models.Category.create({ ...args, userId: user.id })
  )
