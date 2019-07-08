export default (category, args, { loaders }) => {
  if (category.parentId) {
    return loaders.category.load(category.parentId)
  }
  return null
}
