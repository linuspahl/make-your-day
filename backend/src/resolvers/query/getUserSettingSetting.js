export default (userSetting, test, { models }) =>
  models.Setting.findOne({
    where: { id: userSetting.settingId },
  })
