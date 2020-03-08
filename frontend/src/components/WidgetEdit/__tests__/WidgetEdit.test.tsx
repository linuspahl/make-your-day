// libraries
import React from 'react'
// utils
import {
  renderWithAppRoot,
  fireEvent,
  leftClickOption,
  wait,
  cleanup,
} from 'testUtils'
// components & graphql
import WidgetEdit, { pageQuery } from 'components/WidgetEdit/WidgetEdit'
// fixtures
import {
  updateWidgetSuccess,
  widget,
  updateWidgetError,
} from 'store/widget/fixtures'
import { evaluation } from 'store/evaluation/fixtures'

describe('WidgetEdit should', (): void => {
  const propsFixtures = {
    rootPath: '/widgets',
    createNotificationBanner: jest.fn(),
  }
  const renderUtilsProps = {
    mockWrappingRoute: true,
    route: `/widgets/edit/${widget.id}`,
    routePath: '/widgets/edit/:id',
  }

  // API Stub adjustment
  const pageQueryRequest = {
    request: {
      query: pageQuery,
      variables: { widgetId: widget.id },
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

  afterEach((): void => {
    cleanup()
  })

  test('show notification banner on successful edit ', async (): Promise<
    void
  > => {
    const createNotificationBannerStub = jest.fn()
    const { getByText, getByLabelText } = renderWithAppRoot(
      <WidgetEdit {...propsFixtures} />,
      {
        ...renderUtilsProps,
        mocks: [pageQuerySuccess, updateWidgetSuccess],
        context: { createNotificationBanner: createNotificationBannerStub },
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
    expect(createNotificationBannerStub).toBeCalledTimes(1)
    expect(createNotificationBannerStub).toBeCalledWith({
      message: 'Widget New Name erfolgreich bearbeitet',
      type: 'success',
    })
  })

  test('show notification banner on unsuccessful edit', async (): Promise<
    void
  > => {
    const createNotificationBannerStub = jest.fn()
    const { getByText, getByLabelText } = renderWithAppRoot(
      <WidgetEdit {...propsFixtures} />,
      {
        ...renderUtilsProps,
        mocks: [pageQuerySuccess, updateWidgetError],
        context: { createNotificationBanner: createNotificationBannerStub },
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
    expect(createNotificationBannerStub).toBeCalledTimes(1)
    expect(createNotificationBannerStub).toBeCalledWith({
      message: 'Bearbeitung des Widgets fehlgeschlagen',
      type: 'error',
    })
  })
})
