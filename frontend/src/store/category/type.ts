// Partial types
type CategoryType = 'journal' | 'list' | 'counter'

// Deifintion with all fields, but without realtions
export interface Category {
  color?: string
  hasDescription: boolean
  hasSubcategories: boolean
  hasTitle: boolean
  hasUnit: boolean
  icon?: string
  id: number
  parentId?: number
  title: string
  type: CategoryType
  unit?: string
}

// definition with all fields and all relations
export interface CategoryFull extends Category {
  parent?: Category
  subcategories?: [Subcategory?]
}

// Overview / create / edit types
export interface CategoryForList {
  id: Category['id']
  title: Category['title']
  unit?: Category['unit']
  hasSubcategories: Category['hasSubcategories']
}

export interface CategoryForListWithChildren extends CategoryForList {
  subcategories: CategoryFull['subcategories']
  parentId?: Category['parentId']
}

export interface CategoryCreate {
  color?: Category['color']
  hasDescription: boolean
  hasSubcategories: Category['hasSubcategories']
  hasTitle: Category['hasTitle']
  hasUnit: Category['hasUnit']
  icon?: Category['icon']
  title: Category['title']
  type: Category['type']
  unit?: Category['unit']
}

export interface CategoryEdit {
  id: Category['id']
  color?: Category['color']
  hasDescription: boolean
  hasTitle: Category['hasTitle']
  icon?: Category['icon']
  title: Category['title']
}

// Subcategory definitions
export interface Subcategory {
  id: Category['id']
  parentId?: Category['parentId']
  title: Category['title']
  color?: Category['color']
}

export interface SubcategoryCreate {
  parentId?: Category['parentId']
  title: Category['title']
  color?: Category['color']
}

export interface SubcategoryEdit {
  title: Category['title']
  color?: Category['color']
}
