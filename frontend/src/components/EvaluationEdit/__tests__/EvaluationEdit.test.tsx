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
    createNotificationBanner: jest.fn(),
  }
  afterEach((): void => {
    cleanup()
    propsFixture.createNotificationBanner = jest.fn()
  })

  test('show notification banner on successful create ', async (): Promise<
    void
  > => {
    const { getByLabelText, getByText } = renderWithAppRoot(
      <EvaluationEdit {...propsFixture} />,
      {
        ...renderUtilsProps,
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
    expect(propsFixture.createNotificationBanner).toBeCalledTimes(1)
    expect(propsFixture.createNotificationBanner).toBeCalledWith({
      message: 'Auswertung New Title erfolgreich bearbeitet',
      type: 'success',
    })
  })

  test('show notification banner on unsuccessful create', async (): Promise<
    void
  > => {
    const { getByLabelText, getByText } = renderWithAppRoot(
      <EvaluationEdit {...propsFixture} />,
      {
        ...renderUtilsProps,
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
    expect(propsFixture.createNotificationBanner).toBeCalledTimes(1)
    expect(propsFixture.createNotificationBanner).toBeCalledWith({
      message: 'Bearbeitung der Auswertung fehlgeschlagen',
      type: 'error',
    })
  })
})
