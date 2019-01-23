import definition from './definition'

export default (sequelize, models) => {
  const { UserSetting } = models
  const Setting = definition(sequelize)
  Setting.hasMany(UserSetting, { onDelete: 'cascade', onUpdate: 'cascade' })
  return Setting
}
