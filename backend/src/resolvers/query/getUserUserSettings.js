export default (user, args, { models }) =>
  models.UserSetting.findAll({
    where: { userId: user.id },
  })
