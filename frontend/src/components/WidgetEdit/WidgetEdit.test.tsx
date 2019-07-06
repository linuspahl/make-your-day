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
  widget,
  getWidgetSuccess,
  updateWidgetError,
} from 'store/widget/fixtures'
import { getEvaluationsSuccess } from 'store/evaluation/fixtures'

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
  const apiStubResult = {
    id: widget.id,
    title: 'New Name',
    type: widget.type,
    value: widget.value,
    position: widget.position,
  }
  const apiStubVariables = {
    ...apiStubResult,
    evaluationId: 1,
  }

  afterEach(
    (): void => {
      cleanup()
      propsFixtures.createNotificationBanner = jest.fn()
    }
  )

  test('show notification banner on successful edit ', async (): Promise<
    void
  > => {
    const { getByText, getByLabelText } = renderWithAppRoot(
      <WidgetEdit {...propsFixtures} />,
      {
        ...renderUtilsProps,
        mocks: [
          getEvaluationsSuccess,
          getWidgetSuccess,
          adjustApiStub(updateWidgetSuccess, {
            variables: apiStubVariables,
            result: apiStubResult,
          }),
        ],
      }
    )
    // Wait for getEvaluations
    await wait()
    // Wait for getWidget
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
          getEvaluationsSuccess,
          getWidgetSuccess,
          adjustApiStub(updateWidgetError, {
            variables: apiStubVariables,
          }),
        ],
      }
    )
    // Wait for getEvaluations
    await wait()
    // Wait for getWidget
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
