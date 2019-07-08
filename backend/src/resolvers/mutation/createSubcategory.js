export default (parent, args, { models, loaders, currentUser }) =>
  loaders.category.load(args.parentId).then(
    category =>
      category &&
      models.Category.create({
        ...args,
        type: category.type,
        userId: currentUser.id,
      })
  )
