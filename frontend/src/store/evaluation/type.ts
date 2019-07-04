import { CategoryPlain } from 'store/category/type'

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

export interface EvaluationUpdate extends EvaluationCreate {
  id: number
}

export type EvaluationPeriod =
  | 'day'
  | 'week'
  | 'month'
  | 'year'
  | 'lastDay'
  | 'lastWeek'
  | 'lastMonth'
  | 'lastYear'

export interface EvaluationResult {
  datasets: {
    backgroundColor: string
    data: number[]
    label: string
  }[]
  labels: string[]
}

export interface Chart {
  datasets: {
    backgroundColor: string
    data: number[]
    label: string
  }[]
  labels: string[]
}
