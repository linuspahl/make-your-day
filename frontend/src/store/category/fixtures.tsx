import { CategoryPlain, Category } from 'store/category/type'

export const categoryPlain: CategoryPlain = {
  id: 1,
  hasUnit: false,
  hasSubcategories: false,
  title: 'Title'
}

export const category: Category = {
  color: 'red',
  hasDescription: false,
  hasSubcategories: false,
  hasTitle: false,
  hasUnit: true,
  icon: 'check',
  id: 1,
  title: 'title',
  type: 'string',
  unit: 'string'
}
