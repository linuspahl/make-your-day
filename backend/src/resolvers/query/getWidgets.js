export default (parent, args, { models, currentUser }) =>
  models.Widget.findAll({
    where: { userId: currentUser.id },
  })
