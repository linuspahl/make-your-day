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
    // wait for getEvaluations
    await wait()
    // wait for getWidget
    await wait()
    fireEvent.change(getByLabelText('Name'), {
      target: { value: 'New Name' },
    })
    fireEvent.click(getByText('Bearbeiten'), leftClickOption)
    // wait for updateWidget
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
    // wait for getEvaluations
    await wait()
    // wait for getWidget
    await wait()
    fireEvent.change(getByLabelText('Name'), {
      target: { value: 'New Name' },
    })
    fireEvent.click(getByText('Bearbeiten'), leftClickOption)
    // wait for updateWidget
    await wait()
    expect(createNotificationBannerStub).toBeCalledTimes(1)
    expect(createNotificationBannerStub).toBeCalledWith({
      message: 'Bearbeitung des Widgets fehlgeschlagen',
      type: 'error',
    })
  })
})
