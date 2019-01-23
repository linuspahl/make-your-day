import definition from './definition'

export default (sequelize, models) => {
  const { Record } = models
  const Category = definition(sequelize)

  Category.hasOne(Category, { as: 'parent', onDelete: 'cascade' })
  Category.hasMany(Record, { onDelete: 'cascade' })

  return Category
}
