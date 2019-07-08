// libraries
import DataLoader from 'dataloader'
import keyBy from 'lodash/keyBy'

const createCategoryLoader = (models, currentUser) => {
  return new DataLoader(categoryIds => {
    return models.Category.findAll({
      _id: { $in: categoryIds },
      userId: currentUser.id,
    }).then(categorys => {
      const categorysById = keyBy(categorys, 'id')
      return categoryIds.map(categoryId => categorysById[categoryId])
    })
  })
}

module.exports = (models, currentUser) => {
  return {
    category: createCategoryLoader(models, currentUser),
  }
}
