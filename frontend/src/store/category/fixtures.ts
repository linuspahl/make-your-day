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
import { CreateCategory, CreateSubcategory } from 'store/category/mutation'
import {
  GetCategories,
  GetCategoriesIcon,
  GetCategoryPlainWithChildren,
  GetCategoriesWithChildren,
  GetCategoryWithChildren,
  GetCategory,
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
  id: 11,
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

// ## createSubcategory
const createSubcategoryRequest = {
  request: {
    query: CreateSubcategory,
    variables: categoryCreate,
  },
}
export const createSubcategorySuccess = {
  ...createSubcategoryRequest,
  result: {
    data: {
      createSubcategory: category,
    },
  },
}
export const createSubcategoryError = {
  ...createSubcategoryRequest,
  error: new Error('createSubcategory failed'),
}

// ## getCategory
const getCategoryRequest = {
  request: {
    query: GetCategory,
    variables: { id: category.id },
  },
}
export const getCategorySuccess = {
  ...getCategoryRequest,
  result: {
    data: {
      getCategory: category,
    },
  },
}
export const getCategoryError = {
  ...createCategoryRequest,
  error: new Error('getCategory failed'),
}

// ## getCategoryWithChildren
const getCategoryWithChildrenRequest = {
  request: {
    query: GetCategoryWithChildren,
    variables: { id: category.id },
  },
}
export const getCategoryWithChildrenSuccess = {
  ...getCategoryWithChildrenRequest,
  result: {
    data: {
      getCategory: category,
    },
  },
}
export const getCategoryWithChildrenError = {
  ...createCategoryRequest,
  error: new Error('getCategoryWithChildren failed'),
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

// ## getCategoriesWithChildren
const getCategoriesWithChildrenRequest = {
  request: {
    query: GetCategoriesWithChildren,
  },
}
export const getCategoriesWithChildrenSuccess = {
  ...getCategoriesWithChildrenRequest,
  result: {
    data: {
      getCategories: [category],
    },
  },
}
export const getCategoriesWithChildrenError = {
  ...createCategoryRequest,
  error: new Error('getCategoriesWithChildren failed'),
}
