import checkAccess from '../checkAccess'

export default (parent, args, { models, authToken }) =>
  checkAccess(models, authToken).then(user =>
    models.Record.create({ ...args, userId: user.id })
  )
