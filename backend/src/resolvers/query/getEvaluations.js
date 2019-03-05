export default (parent, args, { models, currentUser }) =>
  models.Evaluation.findAll({
    where: { userId: currentUser.id },
  })
