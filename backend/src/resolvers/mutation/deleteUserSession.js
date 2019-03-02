export default (parent, { id }, { models, currentUser }) =>
  models.UserSession.destroy({ where: { id, userId: currentUser.id } })
