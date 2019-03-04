export default (
  parent,
  { createdAt, createdAtFrom, createdAtTo },
  { models, currentUser }
) => {
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

  if (createdAtFrom || createdAtTo) {
    const createdAtCond = {}
    if (createdAtFrom)
      createdAtCond['$gt'] = new Date(createdAtFrom).setHours(0, 0, 0)
    if (createdAtTo)
      createdAtCond['$lt'] = new Date(createdAtTo).setHours(23, 59, 59)

    cond['$and'] = { createdAt: createdAtCond }
  }
  return models.Record.findAll({
    where: cond,
  })
}
