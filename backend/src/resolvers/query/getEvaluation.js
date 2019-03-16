export default (parent, { id }, { models, currentUser }) =>
  models.Evaluation.findOne({
    where: { id, userId: currentUser.id },
    include: [{ model: models.Category }],
  })
