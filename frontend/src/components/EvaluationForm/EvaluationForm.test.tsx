// libraries
import * as React from 'react'
// utils
import {
  cleanup,
  fireEvent,
  leftClickOption,
  Matcher,
  renderWithAppRoot,
  SelectorMatcherOptions,
  wait,
} from 'testUtils'
import { evaluationTypeOptions, evaluationPeriodOptions } from 'params'
// components
import EvaluationForm from './EvaluationForm'
// fixtures
import { evaluation, evaluationCreate } from 'store/evaluation/fixtures'
import { category } from 'store/category/fixtures'

const componentProps = {
  categories: [category],
  rootPath: '/evaluation/create',
}

export const initEvaluationForm = async (
  getByLabelText: (
    text: Matcher,
    options?: SelectorMatcherOptions
  ) => HTMLElement,
  getByText: (text: Matcher, options?: SelectorMatcherOptions) => HTMLElement
): Promise<void> => {
  // fill form
  fireEvent.change(getByLabelText('Name'), {
    target: { value: evaluationCreate.title },
  })
  fireEvent.mouseDown(
    getByLabelText('Kategorie / Unterkategorie'),
    leftClickOption
  )
  fireEvent.click(getByText(evaluation.category.title), leftClickOption)

  fireEvent.mouseDown(getByLabelText('Art'), leftClickOption)
  fireEvent.click(getByText(evaluationTypeOptions[0].title), leftClickOption)

  fireEvent.mouseDown(getByLabelText('Zeitraum'), leftClickOption)
  fireEvent.click(getByText(evaluationPeriodOptions[0].title), leftClickOption)
  await wait()
}

describe('EvaluationForm should', (): void => {
  afterEach(cleanup)

  test('submit with correct values', (): void => {
    const submitActionStub = jest.fn()
    const { getByText, getByLabelText } = renderWithAppRoot(
      <EvaluationForm
        {...componentProps}
        mode="create"
        submitAction={submitActionStub}
      />
    )
    initEvaluationForm(getByLabelText, getByText)
    // Submit form
    fireEvent.click(getByText('Erstellen'), leftClickOption)
    expect(submitActionStub).toBeCalledTimes(1)
    expect(submitActionStub).toBeCalledWith(evaluationCreate)
  })

  test('submit correct with initial values', (): void => {
    const submitActionStub = jest.fn()
    const { getByText } = renderWithAppRoot(
      <EvaluationForm
        {...componentProps}
        mode="create"
        submitAction={submitActionStub}
        initialData={evaluationCreate}
      />
    )
    // Submit form
    fireEvent.click(getByText('Erstellen'), leftClickOption)
    expect(submitActionStub).toBeCalledTimes(1)
    expect(submitActionStub).toBeCalledWith(evaluationCreate)
  })

  test('list subcategories in category select', (): void => {
    const { getByText, getByLabelText } = renderWithAppRoot(
      <EvaluationForm
        {...componentProps}
        mode="create"
        submitAction={(): void => {}}
      />
    )
    // Open category select
    fireEvent.mouseDown(
      getByLabelText('Kategorie / Unterkategorie'),
      leftClickOption
    )
    // Are both subcategories and categories listed?
    expect(getByText(category.title)).toBeInTheDocument()
    expect(
      getByText(`${category.title} -> ${category.subcategories[0].title}`)
    ).toBeInTheDocument()
  })

  test('work without categories', (): void => {
    renderWithAppRoot(
      <EvaluationForm
        categories={undefined}
        mode="create"
        rootPath="/evaluation/create"
        submitAction={(): void => {}}
      />
    )
  })

  test('use edit button as default submit button', (): void => {
    const { getByText } = renderWithAppRoot(
      <EvaluationForm {...componentProps} submitAction={(): void => {}} />
    )
    expect(getByText('Bearbeiten')).toBeInTheDocument()
  })
})
