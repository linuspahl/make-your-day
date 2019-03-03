export default (parent, args, { models, currentUser }) =>
  models.Category.findAll({
    where: { userId: currentUser.id, parentId: null },
  })
