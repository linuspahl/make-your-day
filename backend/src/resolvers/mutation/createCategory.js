export default (parent, args, { models, currentUser }) =>
  models.Category.create({ ...args, userId: currentUser.id })
