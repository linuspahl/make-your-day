export default (parent, { id }, { models, currentUser }) =>
  models.Widget.findOne({ where: { id, userId: currentUser.id } })
