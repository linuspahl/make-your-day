import definition from './definition'

export default sequelize => {
  const Category = definition(sequelize)

  Category.hasOne(Category, { as: 'parent', onDelete: 'CASCADE' })

  return Category
}
