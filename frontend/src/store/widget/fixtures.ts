// graphql
import { GetWidgetsOverview, GetWidget, GetWidgets } from 'store/widget/query'
import { UpdateWidget, CreateWidget } from 'store/widget/mutation'
// interfaces
import { Widget, WidgetCreate } from 'store/widget/type'
import { DocumentNode } from 'graphql'

export const widgetCreate: WidgetCreate = {
  title: 'Notiz 1',
  type: 'textarea',
  position: 'dashboard-top',
}

export const widget: Widget = {
  ...widgetCreate,
  evaluation: null,
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
      getWidget: {
        evaluationId: widget.evaluationId,
        id: widget.id,
        position: widget.position,
        title: widget.title,
        type: widget.type,
        value: widget.value,
      },
    },
  },
}
export const getWidgetError = {
  ...getWidgetRequest,
  error: new Error('getWidget failed'),
}

// ## getWidgets
const getWidgetsRequest = {
  request: {
    query: GetWidgets,
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

// ## getWidgetsOverview
const getWidgetsOverviewRequest = {
  request: {
    query: GetWidgetsOverview,
  },
}
export const getWidgetsOverviewSuccess = {
  ...getWidgetsOverviewRequest,
  result: {
    data: {
      getWidgets: [widget, widget2],
    },
  },
}
export const getWidgetsOverviewError = {
  ...getWidgetsOverviewRequest,
  error: new Error('getWidgetsOverview failed'),
}

// ## updateWidget
// So far this is the only case where we are typing the fixture.
// This is a workaround, because otherwise typscript would have a problmen with evaluationId: null
const updateWidgetRequest: {
  request: {
    query: DocumentNode
    variables: Widget
  }
} = {
  request: {
    query: UpdateWidget,
    variables: {
      title: 'New Name',
      type: 'textarea',
      position: 'dashboard-top',
      evaluationId: null,
      id: 1,
      value: 'Inhalt Notiz 1',
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
