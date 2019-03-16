export default (evaluation, args, { models }) =>
  models.Category.findOne({
    where: { id: evaluation.categoryId },
  })
