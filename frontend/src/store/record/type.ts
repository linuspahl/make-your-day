// interfaces
import { CategoryFull } from 'store/category/type'

export interface Record {
  id: number
  title: string
  amount?: number
  description?: string
  createdAt: string
  categoryId: number
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
  categoryId: number
}

export interface RecordEdit {
  id: number
  title: string
  amount?: number
  description?: string
}
