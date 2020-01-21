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
// components
import EvaluationEdit, {
  pageQuery,
} from 'components/EvaluationEdit/EvaluationEdit'
// fixtures
import {
  updateEvaluationError,
  evaluation,
  updateEvaluationSuccess,
} from 'store/evaluation/fixtures'
// fixtures
import { category } from 'store/category/fixtures'

const pageQueryRequest = {
  request: {
    query: pageQuery,
    variables: { evaluationId: evaluation.id },
  },
}
export const pageQuerySuccess = {
  ...pageQueryRequest,
  result: {
    data: {
      getCategories: [category],
      getEvaluation: evaluation,
    },
  },
}
export const pageQueryError = {
  ...pageQueryRequest,
  error: new Error('pageQuery failed'),
}

describe('EvaluationEdit should', (): void => {
  const renderUtilsProps = {
    route: `/evaluations/edit/${evaluation.id}`,
    mockWrappingRoute: true,
    routePath: `/evaluations/edit/:id`,
  }
  const propsFixture = {
    rootPath: '/evaluations',
  }
  afterEach((): void => {
    cleanup()
  })

  test('show notification banner on successful create ', async (): Promise<
    void
  > => {
    const createNotificationBannerStub = jest.fn()
    const { getByLabelText, getByText } = renderWithAppRoot(
      <EvaluationEdit {...propsFixture} />,
      {
        ...renderUtilsProps,
        context: { createNotificationBanner: createNotificationBannerStub },
        mocks: [updateEvaluationSuccess, pageQuerySuccess],
      }
    )
    // Wait for pageQuery
    await wait()
    fireEvent.change(getByLabelText('Name'), {
      target: { value: 'New Title' },
    })
    fireEvent.click(getByText('Bearbeiten'), leftClickOption)
    await wait()
    expect(createNotificationBannerStub).toBeCalledTimes(1)
    expect(createNotificationBannerStub).toBeCalledWith({
      message: 'Auswertung New Title erfolgreich bearbeitet',
      type: 'success',
    })
  })

  test('show notification banner on unsuccessful create', async (): Promise<
    void
  > => {
    const createNotificationBannerStub = jest.fn()
    const { getByLabelText, getByText } = renderWithAppRoot(
      <EvaluationEdit {...propsFixture} />,
      {
        ...renderUtilsProps,
        context: { createNotificationBanner: createNotificationBannerStub },
        mocks: [updateEvaluationError, pageQuerySuccess],
      }
    )
    // Wait for pageQuery
    await wait()
    fireEvent.change(getByLabelText('Name'), {
      target: { value: 'New Title' },
    })
    fireEvent.click(getByText('Bearbeiten'), leftClickOption)
    // Wait for updateEvaluation
    await wait()
    expect(createNotificationBannerStub).toBeCalledTimes(1)
    expect(createNotificationBannerStub).toBeCalledWith({
      message: 'Bearbeitung der Auswertung fehlgeschlagen',
      type: 'error',
    })
  })
})
