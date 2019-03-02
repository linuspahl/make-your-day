export default (parent, { id }, { models, currentUser }) =>
  models.Category.findOne({ where: { id, userId: currentUser.id } })
