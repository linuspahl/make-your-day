// utils
import { categoryIcons, categoryColors } from 'params'
// interface
import {
  CategoryPlain,
  CategoryFull,
  CategoryCreate,
  SubcategoryCreate,
} from 'store/category/type'
// graphql
import { CreateCategory } from 'store/category/mutation'
import { GetCategories, GetCategoriesIcon } from 'store/category/query'

export const categoryPlain: CategoryPlain = {
  id: 1,
  hasUnit: false,
  hasSubcategories: true,
  title: 'Ausgaben',
}

export const categoryCreate: CategoryCreate = {
  color: Object.keys(categoryColors)[0],
  hasDescription: false,
  hasSubcategories: true,
  hasTitle: false,
  hasUnit: true,
  icon: String(categoryIcons[0].value),
  title: 'Ausgaben',
  type: 'journal',
  unit: 'h',
}

export const subcategoryCreate: SubcategoryCreate = {
  title: 'Einkauf',
  parentId: 1,
}

export const category: CategoryFull = {
  ...categoryCreate,
  subcategories: [
    {
      ...subcategoryCreate,
      id: 10,
      parentId: 1,
    },
  ],
  id: 1,
}

// Api stubs
const createCategoryRequest = {
  request: {
    query: CreateCategory,
    variables: category,
  },
}

export const createCategorySuccess = {
  ...createCategoryRequest,
  result: {
    data: {
      createCategory: category,
    },
  },
}

export const createCategoryError = {
  ...createCategoryRequest,
  error: new Error('createCategory failed'),
}

const getCategoriesRequest = {
  request: {
    query: GetCategories,
  },
}

export const getCategoriesSuccess = {
  ...getCategoriesRequest,
  result: {
    data: {
      getCategories: [category],
    },
  },
}

export const getCategoriesError = {
  ...createCategoryRequest,
  error: new Error('getCategories failed'),
}

const getCategoriesIconRequest = {
  request: {
    query: GetCategoriesIcon,
  },
}

export const getCategoriesIconSuccess = {
  ...getCategoriesIconRequest,
  result: {
    data: {
      getCategories: [category],
    },
  },
}

export const getCategoriesIconError = {
  ...createCategoryRequest,
  error: new Error('getCategories failed'),
}
