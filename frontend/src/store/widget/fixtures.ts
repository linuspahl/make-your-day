// graphql
import { Widget, WidgetCreate } from 'store/widget/type'
import { GetWidgetsOverview, GetWidget } from 'store/widget/query'

export const widgetCreate: WidgetCreate = {
  title: 'Notiz',
  type: 'textarea',
  position: 'dashboard-top',
}

export const widget: Widget = {
  ...widgetCreate,
  evaluation: null,
  value: 'Inhalt Notiz',
  id: 1,
}

export const widget2: Widget = {
  ...widget,
  id: 2,
  title: 'Notiz 2',
}

// Api stubs
const getWidgetsRequest = {
  request: {
    query: GetWidgetsOverview,
  },
}
export const getWidgetsSuccess = {
  ...getWidgetsRequest,
  result: {
    data: {
      getWidgets: [widget, widget2],
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
