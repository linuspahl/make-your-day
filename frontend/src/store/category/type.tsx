export type CategoryFull = {
  color?: string
  hasDescription: boolean
  hasSubcategories: boolean
  hasTitle: boolean
  hasUnit: boolean
  icon?: string
  id: number
  parent?: Category
  parentId?: number
  subcategories?: [Category]
  title: string
  type: string
  unit?: string
}

export interface CategoryPlain {
  color?: string
  hasSubcategories: boolean
  hasUnit: boolean
  icon?: string
  id: number
  parentId?: number
  title: string
  unit?: string
}

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
  type: string
  unit?: string
}

export interface CategoryCreate {
  color?: string,
  hasDescription: boolean
  hasSubcategories: boolean
  hasTitle: boolean
  hasUnit: boolean
  icon?: string
  title: string
  type: string
  unit?: string
}

export interface Subcategory {
  id: Category['id']
  parentId?: CategoryFull['parentId']
  title: Category['title']
}

export interface SubcategoryCreate {
  parentId?: CategoryFull['parentId']
  title: Category['title']
}