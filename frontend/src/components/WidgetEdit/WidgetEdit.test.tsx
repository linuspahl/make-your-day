// libraries
import * as React from 'react'
// utils
import {
  renderWithAppRoot,
  fireEvent,
  leftClickOption,
  wait,
  cleanup,
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
  const propsFixtures = { rootPath: '/widgets' }
  const renderUtilsProps = {
    mockWrappingRoute: true,
    route: `/widgets/edit/${widget.id}`,
    routePath: '/widgets/edit/:id',
  }
  afterEach(cleanup)

  test('show notification banner on successful edit ', async (): Promise<
    void
  > => {
    const createNotificationBannerStub = jest.fn()
    const { getByText, getByLabelText } = renderWithAppRoot(
      <WidgetEdit
        {...propsFixtures}
        createNotificationBanner={createNotificationBannerStub}
      />,
      {
        ...renderUtilsProps,
        mocks: [getEvaluationsSuccess, getWidgetSuccess, updateWidgetSuccess],
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
      <WidgetEdit
        {...propsFixtures}
        createNotificationBanner={createNotificationBannerStub}
      />,
      {
        ...renderUtilsProps,
        mocks: [getEvaluationsSuccess, getWidgetSuccess, updateWidgetError],
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
    expect(createNotificationBannerStub).toBeCalledTimes(1)
    expect(createNotificationBannerStub).toBeCalledWith({
      message: 'Bearbeitung des Widgets fehlgeschlagen',
      type: 'error',
    })
  })
})
