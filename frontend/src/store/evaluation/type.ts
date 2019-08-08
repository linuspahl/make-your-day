import { CategoryForList } from 'store/category/type'

export interface Evaluation {
  categoryId: string
  groupSubcategories: boolean
  id: string
  period: EvaluationPeriod
  title: string
  type: EvaluationType
}

export interface EvaluationFull extends Evaluation {
  category?: CategoryForList
  result?: EvaluationResult
}

export interface EvaluationForList {
  id: string
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
  series: {
    color?: string
    title?: string
    data: {
      title?: string
      value: number
      color?: string
    }[]
  }[]
  labels: string[]
}

export interface Chart {
  series: ChartSeries[]
  labels: string[]
}

export interface ChartSeries {
  className?: string
  data: ChartSeriesData[]
}

export type ChartSeriesData = { value: number; className?: string } | number
