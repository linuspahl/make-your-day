import checkAccess from '../checkAccess'

export default (parent, args, { models, authToken }) =>
  checkAccess(models, authToken).then(user =>
    models.Category.findOne({
      where: { id: args.parentId, userId: user.id },
    }).then(
      category =>
        category &&
        models.Category.create({
          ...args,
          type: category.type,
          userId: user.id,
        })
    )
  )
