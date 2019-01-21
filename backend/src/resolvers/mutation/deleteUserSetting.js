import checkAccess from '../checkAccess'

export default (parent, { settingId }, { models, authToken }) =>
  checkAccess(models, authToken).then(user =>
    models.UserSetting.destroy({ where: { settingId, userId: user.id } })
  )
