import definition from './definition'

export default (sequelize, DataTypes) => {
  const Record = definition(sequelize, DataTypes)
  Record.associate = models => {
    Record.belongsTo(models.Category)
  }
  return Record
}
