export default (parent, args, { models, currentUser }) => {
  const cond = { userId: currentUser.id }
  if (args.parentsOnly) {
    cond.parentId = null
  }
  return models.Category.findAll({
    where: cond,
  })
}
