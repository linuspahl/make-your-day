// utils
import { categoryIcons, categoryColors } from 'params'
// interface
import {
  CategoryPlain,
  CategoryFull,
  CategoryCreate,
  SubcategoryCreate,
  Subcategory,
} from 'store/category/type'
// graphql
import { CreateCategory } from 'store/category/mutation'
import {
  GetCategories,
  GetCategoriesIcon,
  GetCategoryPlainWithChildren,
} from 'store/category/query'

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

export const subcategory: Subcategory = {
  ...subcategoryCreate,
  id: 10,
  parentId: 1,
}

export const category: CategoryFull = {
  ...categoryCreate,
  parent: null,
  subcategories: [subcategory],
  id: 1,
}

// # Api stubs

// ## createCategory
const createCategoryRequest = {
  request: {
    query: CreateCategory,
    variables: categoryCreate,
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

// ## getCategories
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

// ## getCategoriesIcon
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
  error: new Error('getCategoriesIcon failed'),
}

// ## getCategoryPlainWithChildren
const getCategoryPlainWithChildrenRequest = {
  request: {
    query: GetCategoryPlainWithChildren,
    variables: { id: category.id },
  },
}
export const getCategoryPlainWithChildrenSuccess = {
  ...getCategoryPlainWithChildrenRequest,
  result: {
    data: {
      getCategory: category,
    },
  },
}
export const getCategoryPlainWithChildrenError = {
  ...createCategoryRequest,
  error: new Error('getCategoryPlainWithChildren failed'),
}
