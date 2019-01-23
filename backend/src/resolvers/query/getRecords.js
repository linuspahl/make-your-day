import checkAccess from '../checkAccess'

export default (parent, { title }, { models, authToken }) =>
  checkAccess(models, authToken).then(user =>
    models.Record.findAll({
      where: { userId: user.id },
    })
  )
