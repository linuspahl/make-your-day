export default (parent, args, { models, currentUser }) =>
  models.Widget.create({ ...args, userId: currentUser.id })
