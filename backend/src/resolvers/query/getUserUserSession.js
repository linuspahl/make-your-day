// Returns the newest UserSession
// Only used by the login action
export default (user, args, { models }) =>
  models.UserSession.findOne({
    where: { userId: user.id },
    order: [['createdAt', 'DESC']],
  })
