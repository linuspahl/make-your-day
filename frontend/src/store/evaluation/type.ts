import { CategoryForList } from 'store/category/type'

export interface Evaluation {
  categoryId: number
  groupSubcategories: boolean
  id: number
  period: EvaluationPeriod
  title: string
  type: EvaluationType
}

export interface EvaluationFull extends Evaluation {
  category?: CategoryForList
  result?: EvaluationResult
}

export interface EvaluationForList {
  id: number
  title: string
}

export interface EvaluationCreate {
  categoryId: Evaluation['categoryId']
  groupSubcategories: Evaluation['groupSubcategories']
  period: Evaluation['period']
  title: Evaluation['title']
  type: Evaluation['type']
}

export interface EvaluationEdit extends EvaluationCreate {
  id: Evaluation['id']
}

// partials
export type EvaluationPeriod =
  | 'day'
  | 'week'
  | 'month'
  | 'year'
  | 'lastDay'
  | 'lastWeek'
  | 'lastMonth'
  | 'lastYear'

export type EvaluationType = 'barchart' | 'linechart' | 'piechart'

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
