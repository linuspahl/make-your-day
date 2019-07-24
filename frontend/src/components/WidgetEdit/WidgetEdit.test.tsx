// libraries
import * as React from 'react'
// utils
import {
  renderWithAppRoot,
  fireEvent,
  leftClickOption,
  wait,
  cleanup,
  adjustApiStub,
} from 'testUtils'
// components
import WidgetEdit from './WidgetEdit'
// fixtures
import {
  updateWidgetSuccess,
  evaluationWidget,
  updateWidgetError,
} from 'store/widget/fixtures'
import { evaluation } from 'store/evaluation/fixtures'
// graphql
import { pageQuery } from './WidgetEdit'

describe('WidgetEdit should', (): void => {
  const propsFixtures = {
    rootPath: '/widgets',
    createNotificationBanner: jest.fn(),
  }
  const renderUtilsProps = {
    mockWrappingRoute: true,
    route: `/widgets/edit/${evaluationWidget.id}`,
    routePath: '/widgets/edit/:id',
  }

  // API Stub adjustment
  const pageQueryRequest = {
    request: {
      query: pageQuery,
      variables: { widgetId: evaluationWidget.id },
    },
  }
  const pageQuerySuccess = {
    ...pageQueryRequest,
    result: {
      data: {
        getEvaluations: [
          {
            id: evaluation.id,
            title: evaluation.title,
          },
        ],
        getWidget: {
          evaluationId: evaluationWidget.evaluation.id,
          id: evaluationWidget.id,
          position: evaluationWidget.position,
          title: evaluationWidget.title,
          type: evaluationWidget.type,
          value: evaluationWidget.value,
        },
      },
    },
  }
  const pageQueryError = {
    ...pageQueryRequest,
    error: new Error('pageQuery failed'),
  }

  const updateWidgetResult = {
    id: evaluationWidget.id,
    title: 'New Name',
    type: evaluationWidget.type,
    value: evaluationWidget.value,
    position: evaluationWidget.position,
  }
  const updateWidgetVariables = {
    ...updateWidgetResult,
    evaluationId: 1,
  }

  afterEach((): void => {
    cleanup()
    propsFixtures.createNotificationBanner = jest.fn()
  })

  test('show notification banner on successful edit ', async (): Promise<
    void
  > => {
    const { getByText, getByLabelText } = renderWithAppRoot(
      <WidgetEdit {...propsFixtures} />,
      {
        ...renderUtilsProps,
        mocks: [
          pageQuerySuccess,
          adjustApiStub(updateWidgetSuccess, {
            variables: updateWidgetVariables,
            result: updateWidgetResult,
          }),
        ],
      }
    )
    // Wait for pageQuery
    await wait()
    fireEvent.change(getByLabelText('Name'), {
      target: { value: 'New Name' },
    })
    fireEvent.click(getByText('Bearbeiten'), leftClickOption)
    // Wait for updateWidget
    await wait()
    expect(propsFixtures.createNotificationBanner).toBeCalledTimes(1)
    expect(propsFixtures.createNotificationBanner).toBeCalledWith({
      message: 'Widget New Name erfolgreich bearbeitet',
      type: 'success',
    })
  })

  test('show notification banner on unsuccessful edit', async (): Promise<
    void
  > => {
    const { getByText, getByLabelText } = renderWithAppRoot(
      <WidgetEdit {...propsFixtures} />,
      {
        ...renderUtilsProps,
        mocks: [
          pageQueryError,
          adjustApiStub(updateWidgetError, {
            variables: updateWidgetVariables,
          }),
        ],
      }
    )
    // Wait for pageQuery
    await wait()
    fireEvent.change(getByLabelText('Name'), {
      target: { value: 'New Name' },
    })
    fireEvent.click(getByText('Bearbeiten'), leftClickOption)
    // Wait for updateWidget
    await wait()
    expect(propsFixtures.createNotificationBanner).toBeCalledTimes(1)
    expect(propsFixtures.createNotificationBanner).toBeCalledWith({
      message: 'Bearbeitung des Widgets fehlgeschlagen',
      type: 'error',
    })
  })
})
