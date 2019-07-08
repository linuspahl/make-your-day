export default (record, args, { loaders }) =>
  loaders.category.load(record.categoryId)
