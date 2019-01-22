import checkAccess from '../checkAccess'

export default (parent, args, { models, authToken }) =>
  checkAccess(models, authToken).then(user =>
    models.Widget.update(args, {
      where: { id: args.id, userId: user.id },
      returning: true,
    }).then(result => result[1][0])
  )
