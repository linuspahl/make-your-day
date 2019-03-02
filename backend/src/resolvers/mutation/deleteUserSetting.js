export default (parent, { settingId }, { models, currentUser }) =>
  models.UserSetting.destroy({ where: { settingId, userId: currentUser.id } })
