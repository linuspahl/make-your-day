export default (parent, args, { models, currentUser }) =>
  models.Evaluation.create({ ...args, userId: currentUser.id })
