import definition from './definition'

export default (sequelize, DataTypes) => {
  const Category = definition(sequelize, DataTypes)

  Category.hasOne(Category, {
    as: 'parent',
    onDelete: 'cascade',
    onUpdate: 'cascade',
  })

  Category.associate = models => {
    Category.hasMany(models.Record, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })
  }

  return Category
}
