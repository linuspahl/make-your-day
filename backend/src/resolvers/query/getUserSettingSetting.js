export default (userSetting, args, { models }) =>
  models.Setting.findOne({
    where: { id: userSetting.settingId },
  })
