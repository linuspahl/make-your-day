// utils
import { categoryIcons, categoryColors } from 'params'
// interface
import {
  CategoryFull,
  CategoryCreate,
  SubcategoryCreate,
  Subcategory,
  CategoryForListWithChildren,
} from 'store/category/type'
// graphql
import {
  CreateCategory,
  CreateSubcategory,
  UpdateCategory,
  UpdateSubcategory,
} from 'store/category/mutation'
import {
  GetCategories,
  GetCategoriesForList,
  GetCategoriesForListWithChildren,
  GetCategory,
  GetCategoryForListWithChildren,
  GetCategoryWithChildren,
  GetSubcategory,
} from 'store/category/query'

// subcategory
export const subcategory: Subcategory = {
  color: Object.keys(categoryColors)[1],
  id: 11,
  parentId: 1,
  title: 'Einkauf',
}

export const subcategoryCreate: SubcategoryCreate = {
  color: Object.keys(categoryColors)[1],
  parentId: subcategory.parentId,
  title: 'Einkauf',
}

// category
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

export const category: CategoryFull = {
  ...categoryCreate,
  parent: null,
  subcategories: [subcategory],
  id: 1,
}

export const categoryForListWithChildren: CategoryForListWithChildren = {
  id: 1,
  parentId: null,
  title: category.title,
  hasSubcategories: true,
  subcategories: [subcategory],
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
    variables: subcategoryCreate,
  },
}
export const createSubcategorySuccess = {
  ...createSubcategoryRequest,
  result: {
    data: {
      createSubcategory: subcategory,
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
      getCategory: {
        ...categoryCreate,
        id: 1,
      },
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

// ## getCategoryForListWithChildren
const getCategoryForListWithChildrenRequest = {
  request: {
    query: GetCategoryForListWithChildren,
    variables: { id: category.id },
  },
}
export const getCategoryForListWithChildrenSuccess = {
  ...getCategoryForListWithChildrenRequest,
  result: {
    data: {
      getCategory: category,
    },
  },
}
export const getCategoryForListWithChildrenError = {
  ...getCategoryForListWithChildrenRequest,
  error: new Error('getCategoryPlainWithChildren failed'),
}

// ## getSubcategory
const getSubcategoryRequest = {
  request: {
    query: GetSubcategory,
    variables: { id: subcategory.id },
  },
}
export const getSubcategorySuccess = {
  ...getSubcategoryRequest,
  result: {
    data: {
      getCategory: subcategory,
    },
  },
}

// ## getCategories
const getCategoriesRequest = {
  request: {
    query: GetCategoriesForList,
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

// ## getCategoriesForList
const getCategoriesForListRequest = {
  request: {
    query: GetCategories,
  },
}
export const getCategoriesForListSuccess = {
  ...getCategoriesForListRequest,
  result: {
    data: {
      getCategories: [category],
    },
  },
}
export const getCategoriesForListError = {
  ...createCategoryRequest,
  error: new Error('getCategoriesForList failed'),
}

// ## getCategoriesForListWithChildren
const getCategoriesForListWithChildrenRequest = {
  request: {
    query: GetCategoriesForListWithChildren,
  },
}
export const getCategoriesForListWithChildrenSuccess = {
  ...getCategoriesForListWithChildrenRequest,
  result: {
    data: {
      getCategories: [category],
    },
  },
}
export const getCategoriesForListWithChildrenError = {
  ...createCategoryRequest,
  error: new Error('getCategoriesForListWithChildren failed'),
}

// ## updateCategory
const updateCategoryRequest = {
  request: {
    query: UpdateCategory,
    variables: {
      color: category.color,
      hasDescription: category.hasDescription,
      hasTitle: category.hasTitle,
      icon: category.icon,
      title: category.title,
      id: category.id,
    },
  },
}
export const updateCategorySuccess = {
  ...updateCategoryRequest,
  result: {
    data: {
      updateCategory: {
        ...categoryCreate,
        id: 1,
      },
    },
  },
}
export const updateCategoryError = {
  ...updateCategoryRequest,
  error: new Error('updateWidget failed'),
}

// ## updateSubcategory
const updateSubcategoryRequest = {
  request: {
    query: UpdateSubcategory,
    variables: {
      id: subcategory.id,
      title: 'New Name',
      color: subcategory.color,
    },
  },
}
export const updateSubcategorySuccess = {
  ...updateSubcategoryRequest,
  result: {
    data: {
      updateCategory: {
        ...subcategory,
        title: 'New Name',
      },
    },
  },
}
export const updateSubcategoryError = {
  ...updateSubcategoryRequest,
  error: new Error('updateSubcategory failed'),
}
