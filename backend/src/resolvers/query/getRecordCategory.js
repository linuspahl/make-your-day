export default (record, args, { models }) =>
  models.Category.findOne({
    where: { id: record.categoryId },
  })
