export default (parent, { id }, { models, currentUser }) =>
  models.Record.destroy({ where: { id, userId: currentUser.id } })
