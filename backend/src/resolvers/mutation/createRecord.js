export default (parent, args, { models, currentUser }) =>
  models.Record.create({ ...args, userId: currentUser.id })
