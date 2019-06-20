// libraries
import * as React from 'react'
// utils
import initEvaluationForm from 'components/EvaluationForm/__tests__/initEvaluationForm'
import {
  cleanup,
  fireEvent,
  leftClickOption,
  renderWithAppRoot,
} from 'testUtils'
// components
import EvaluationForm from './EvaluationForm'
// fixtures
import { evaluationCreate } from 'store/evaluation/fixtures'
import { category } from 'store/category/fixtures'

const componentProps = {
  categories: [category],
  rootPath: '/evaluation/create',
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
