export default (parent, { id }, { models, currentUser }) =>
  models.Widget.destroy({ where: { id, userId: currentUser.id } })
