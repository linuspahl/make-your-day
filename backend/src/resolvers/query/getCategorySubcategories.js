export default (category, args, { models }) =>
  models.Category.findAll({
    where: { parentId: category.id },
  })
