// interfaces
import { Evaluation } from 'store/evaluation/type'

type WidgetType = 'textarea' | 'timeline' | 'evaluation'
type WidgetPosition = 'dashboard-bottom' | 'dashboard-top'

export interface Widget {
  evaluationId?: number
  id: number
  position: WidgetPosition
  title: string
  type: WidgetType
  value?: string
}

export interface WidgetFull extends Widget {
  evaluation?: Evaluation
}

export interface WidgetForList {
  id: Widget['id']
  position: Widget['position']
  title: Widget['title']
  type: Widget['type']
}

export interface WidgetCreate {
  evaluationId?: Widget['evaluationId']
  position: Widget['position']
  title: Widget['title']
  type: Widget['type']
}

export interface WidgetEdit {
  id: Widget['id']
  evaluationId?: Widget['evaluationId']
  position?: Widget['position']
  title?: Widget['title']
  value?: Widget['value']
}
