import definition from './definition'

export default (sequelize, DataTypes) => {
  const Setting = definition(sequelize, DataTypes)
  Setting.associate = models => {
    Setting.hasMany(models.UserSetting, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })
  }

  return Setting
}
