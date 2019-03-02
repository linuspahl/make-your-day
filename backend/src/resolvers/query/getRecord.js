export default (parent, { id }, { models, currentUser }) =>
  models.Record.findOne({ where: { id, userId: currentUser.id } })
