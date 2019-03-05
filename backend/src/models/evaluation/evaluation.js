import definition from './definition'

export default (sequelize, DataTypes) => {
  const Evaluation = definition(sequelize, DataTypes)

  Evaluation.associate = models => {
    Evaluation.belongsTo(models.Category)
  }

  return Evaluation
}
