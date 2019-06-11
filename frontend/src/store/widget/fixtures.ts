// graphql
import { Widget } from 'store/widget/type'
// graphql
import { GetWidgets, GetWidget } from 'store/widget/query'

export const widget: Widget = {
  id: 1,
  title: 'Notiz',
  value: 'Inhalt Notiz',
  type: 'timeline',
  position: 'dashboard-bottom',
  evaluation: null,
}

// Api stubs
const getWidgetsRequest = {
  request: {
    query: GetWidgets,
  },
}
export const getWidgetsSuccess = {
  ...getWidgetsRequest,
  result: {
    data: {
      getWidgets: [widget],
    },
  },
}

export const getWidgetsError = {
  ...getWidgetsRequest,
  error: new Error('getWidgets failed'),
}

const getWidgetRequest = {
  request: {
    query: GetWidget,
  },
}

export const getWidgetSuccess = {
  ...getWidgetRequest,
  result: {
    data: {
      getWidget: widget,
    },
  },
}

export const getWidgetError = {
  ...getWidgetRequest,
  error: new Error('getWidgets failed'),
}

export const updateWidgetSuccess = {
  ...getWidgetRequest,
  result: {
    data: {
      updateWidget: widget,
    },
  },
}
