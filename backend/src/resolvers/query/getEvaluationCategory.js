export default (evaluation, args, { loaders }) =>
  loaders.category.load(evaluation.categoryId)
