export default (category, args, { models }) =>
  models.Category.findOne({
    where: { id: category.parentId },
  })
