export default (parent, { createdAt }, { models, currentUser }) => {
  const cond = { userId: currentUser.id }
  // const createdAt = getDateString(createdAt)

  if (createdAt) {
    // If createdAt param is defined, we want to get all records of the related day
    const date = new Date(createdAt)
    cond.createdAt = {
      ['$gte']: date.setHours(0, 0, 0),
      ['$lte']: date.setHours(23, 59, 59),
    }
  }

  return models.Record.findAll({
    where: cond,
  })
}
