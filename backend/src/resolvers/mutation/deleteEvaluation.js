export default (parent, { id }, { models, currentUser }) =>
  models.Evaluation.destroy({ where: { id, userId: currentUser.id } })
