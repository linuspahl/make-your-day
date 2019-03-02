export default (parent, { id }, { models, currentUser }) =>
  models.Category.destroy({ where: { id, userId: currentUser.id } })
