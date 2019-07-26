// graphql
import {
  GetWidgetsForList,
  GetWidget,
  GetWidgetsWithEvaluation,
} from 'store/widget/query'
import { UpdateWidget, CreateWidget } from 'store/widget/mutation'
// interfaces
import { Widget, WidgetFull, WidgetCreate, WidgetEdit } from 'store/widget/type'
import { DocumentNode } from 'graphql'
// fixtures
import { evaluation } from 'store/evaluation/fixtures'

export const widgetCreate: WidgetCreate = {
  title: 'Notiz 1',
  type: 'textarea',
  position: 'dashboard-top',
}

export const widget: Widget = {
  ...widgetCreate,
  value: 'Inhalt Notiz 1',
  evaluationId: null,
  id: 1,
}

export const evaluationWidget: WidgetFull = {
  title: 'Notiz 1',
  type: 'evaluation',
  position: 'dashboard-top',
  evaluation,
  evaluationId: evaluation.id,
  value: 'Inhalt Notiz 1',
  id: 1,
}

export const widget2: Widget = {
  ...widget,
  id: 2,
  title: 'Notiz 2',
  value: 'Inhalt Notiz 2',
}

// # Api stubs

// ## createWidget
const createWidgetRequest = {
  request: {
    query: CreateWidget,
    variables: widgetCreate,
  },
}
export const createWidgetSuccess = {
  ...createWidgetRequest,
  result: {
    data: {
      createWidget: widget,
    },
  },
}
export const createWidgetError = {
  ...createWidgetRequest,
  error: new Error('createWidget failed'),
}

// ## getWidget
const getWidgetRequest = {
  request: {
    query: GetWidget,
    variables: { id: widget.id },
  },
}
export const getWidgetSuccess = {
  ...getWidgetRequest,
  result: {
    data: {
      getWidget: { ...widget, evaluationId: 1 },
    },
  },
}
export const getWidgetError = {
  ...getWidgetRequest,
  error: new Error('getWidget failed'),
}

// ## getWidgets
const getWidgetsWithEvaluationRequest = {
  request: {
    query: GetWidgetsWithEvaluation,
  },
}
export const getWidgetsWithEvaluationSuccess = {
  ...getWidgetsWithEvaluationRequest,
  result: {
    data: {
      getWidgets: [{ ...widget, evaluation: null }, { ...widget2, evaluation }],
    },
  },
}
export const getWidgetsWithEvaluationError = {
  ...getWidgetsWithEvaluationRequest,
  error: new Error('getWidgets failed'),
}

// ## getWidgetsForList
const getWidgetsForListRequest = {
  request: {
    query: GetWidgetsForList,
  },
}
export const getWidgetsForListSuccess = {
  ...getWidgetsForListRequest,
  result: {
    data: {
      getWidgets: [widget, widget2],
    },
  },
}
export const getWidgetsForListError = {
  ...getWidgetsForListRequest,
  error: new Error('getWidgetsForList failed'),
}

// ## updateWidget
// So far this is the only case where we are typing the fixture.
// This is a workaround, because otherwise typscript would have a problmen with evaluationId: null
const updateWidgetRequest: {
  request: {
    query: DocumentNode
    variables: WidgetEdit
  }
} = {
  request: {
    query: UpdateWidget,
    variables: {
      title: 'New Name',
      position: widget.position,
      evaluationId: null,
      id: widget.id,
    },
  },
}

export const updateWidgetSuccess = {
  ...updateWidgetRequest,
  result: {
    data: {
      updateWidget: { ...widget, title: 'New Name' },
    },
  },
}
export const updateWidgetError = {
  ...updateWidgetRequest,
  error: new Error('updateWidget failed'),
}
