import { CategoryPlain } from "store/category/type";

export interface EvaluationPlain {
  id: number
  title: string
} 

export interface Evaluation {
  category: CategoryPlain
  categoryId: number
  groupSubcategories: boolean
  id: number
  period: EvaluationPeriod
  result?: EvaluationResult
  title: string
  type: 'barchart' | 'linechart' | 'piechart'
}

export interface EvaluationCreate {
  categoryId: number
  groupSubcategories: boolean
  period: EvaluationPeriod
  title: string
  type: 'barchart' | 'linechart' | 'piechart'
}

export type EvaluationPeriod = 'week' | 'month' | 'year' | 'lastDay' | 'lastWeek' | 'lastMonth' | 'lastYear'

export interface EvaluationResult {
  datasets: Array<{
    backgroundColor: string
    data: Array<number>
    label: string
  }>
  labels: Array<string>
}

export interface Chart {
  datasets: Array<{
    backgroundColor: string
    data: Array<number>
    label: string
  }>
  labels: Array<string>
}