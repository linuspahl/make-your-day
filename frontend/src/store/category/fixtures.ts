import { CategoryPlain, CategoryFull } from 'store/category/type'

export const categoryPlain: CategoryPlain = {
  id: 1,
  hasUnit: false,
  hasSubcategories: false,
  title: 'Title',
}

export const category: CategoryFull = {
  color: 'red',
  hasDescription: false,
  hasSubcategories: false,
  hasTitle: false,
  hasUnit: true,
  subcategories: [],
  icon: 'check',
  id: 1,
  title: 'title',
  type: 'string',
  unit: '€',
}
