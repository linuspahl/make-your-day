export default (parent, { title }, { models, currentUser }) =>
  models.Category.findAll({
    where: { userId: currentUser.id, parentId: null },
  })
