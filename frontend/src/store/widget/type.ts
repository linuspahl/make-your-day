// interfaces
import { Evaluation } from 'store/evaluation/type'

type WidgetType = 'textarea' | 'timeline' | 'evaluation'
type WidgetPosition = 'dashboard-bottom' | 'dashboard-top'

export interface Widget {
  evaluation?: Evaluation
  evaluationId?: number
  id: number
  position: WidgetPosition
  title: string
  type: WidgetType
  value?: string
}

export interface WidgetCreate {
  evaluationId?: number
  position: WidgetPosition
  title: string
  type: WidgetType
}
