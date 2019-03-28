// interfaces
import { CategoryFull } from 'store/category/type'

export interface Record {
  id: number
  title: string
  amount?: string
  description: string
  createdAt: string
  categoryId: number
  category: CategoryFull
}

export interface RecordCreate {
  createdAt: string
  title: string
  amount?: string
  description: string
  categoryId: number
}
