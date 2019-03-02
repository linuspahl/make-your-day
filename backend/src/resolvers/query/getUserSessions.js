export default (parent, args, { models, currentUser }) =>
  models.UserSession.findAll({ where: { userId: currentUser.id } })
