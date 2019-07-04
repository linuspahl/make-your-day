// libraries
import * as React from 'react'
// utils
import initEvaluationForm from 'components/EvaluationForm/__tests__/initEvaluationForm'
import {
  renderWithAppRoot,
  fireEvent,
  leftClickOption,
  wait,
  cleanup,
} from 'testUtils'
// components
import EvaluationCreate from './EvaluationCreate'
// fixtures
import {
  createEvaluationSuccess,
  createEvaluationError,
  evaluation,
} from 'store/evaluation/fixtures'

import { getCategoriesWithChildrenSuccess } from 'store/category/fixtures'

describe('EvaluationCreate should', (): void => {
  const propsFixture = {
    rootPath: '/evaluations',
  }
  afterEach(cleanup)

  test('show notification banner on successful create ', async (): Promise<
    void
  > => {
    const createNotificationBannerStub = jest.fn()
    const { getByLabelText, getByText } = renderWithAppRoot(
      <EvaluationCreate
        {...propsFixture}
        createNotificationBanner={createNotificationBannerStub}
      />,
      { mocks: [createEvaluationSuccess, getCategoriesWithChildrenSuccess] }
    )
    await wait()
    initEvaluationForm(getByLabelText, getByText)
    fireEvent.click(getByText('Erstellen'), leftClickOption)
    await wait()
    expect(createNotificationBannerStub).toBeCalledTimes(1)
    expect(createNotificationBannerStub).toBeCalledWith({
      message: `Auswertung ${evaluation.title} erfolgreich erstellt`,
      type: 'success',
    })
  })

  test('show notification banner on unsuccessful create', async (): Promise<
    void
  > => {
    const createNotificationBannerStub = jest.fn()
    const { getByLabelText, getByText } = renderWithAppRoot(
      <EvaluationCreate
        {...propsFixture}
        createNotificationBanner={createNotificationBannerStub}
      />,
      {
        mocks: [createEvaluationError, getCategoriesWithChildrenSuccess],
      }
    )
    await wait()
    initEvaluationForm(getByLabelText, getByText)
    fireEvent.click(getByText('Erstellen'), leftClickOption)
    await wait()
    expect(createNotificationBannerStub).toBeCalledTimes(1)
    expect(createNotificationBannerStub).toBeCalledWith({
      message: 'Erstellung der Auswertung fehlgeschlagen',
      type: 'error',
    })
  })
})
