// interfaces
import { CategoryFull } from 'store/category/type'

export interface Record {
  id: string
  title: string
  amount?: number
  description?: string
  createdAt: string
  categoryId: string
  category: CategoryFull
}

export interface RecordFull extends Record {
  category: CategoryFull
}

export interface RecordCreate {
  createdAt?: string
  title: string
  amount?: number
  description?: string
  categoryId: string
}

export interface RecordEdit {
  id: string
  title: string
  amount?: number
  description?: string
}
