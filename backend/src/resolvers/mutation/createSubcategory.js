export default (parent, args, { models, currentUser }) =>
  models.Category.findOne({
    where: { id: args.parentId, userId: currentUser.id },
  }).then(
    category =>
      category &&
      models.Category.create({
        ...args,
        type: category.type,
        userId: currentUser.id,
      })
  )
