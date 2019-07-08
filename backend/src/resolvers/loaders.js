// libraries
import DataLoader from 'dataloader'
import keyBy from 'lodash/keyBy'

const createCategoryLoader = models => {
  return new DataLoader(categoryIds => {
    return models.Category.findAll({ _id: { $in: categoryIds } }).then(
      categorys => {
        const categorysById = keyBy(categorys, 'id')
        return categoryIds.map(categoryId => categorysById[categoryId])
      }
    )
  })
}

module.exports = models => {
  return {
    category: createCategoryLoader(models),
  }
}
