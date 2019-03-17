import definition from './definition'

export default (sequelize, DataTypes) => {
  const Widget = definition(sequelize, DataTypes)
  Widget.associate = models => {
    Widget.belongsTo(models.Evaluation)
  }
  return Widget
}
