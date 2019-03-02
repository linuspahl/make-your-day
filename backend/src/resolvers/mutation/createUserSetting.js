export default (parent, args, { models, currentUser }) =>
  models.UserSetting.create({ ...args, userId: currentUser.id })
