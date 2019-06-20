// libraries
import * as React from 'react'
// utils
import { categoryTypeOptions } from 'params'
import initCategoryForm from 'components/CategoryForm/__tests__/initCategoryForm'
import {
  cleanup,
  fireEvent,
  leftClickOption,
  renderWithAppRoot,
} from 'testUtils'
// components
import CategoryForm from 'components/CategoryForm/CategoryForm'
// fixtures
import { categoryCreate } from 'store/category/fixtures'

const componentProps = {
  rootPath: '/category/create',
}

describe('CategoryForm should', (): void => {
  afterEach(cleanup)

  test('submit with correct values', (): void => {
    const submitActionStub = jest.fn()
    const { getByText, getByLabelText } = renderWithAppRoot(
      <CategoryForm
        {...componentProps}
        mode="create"
        submitAction={submitActionStub}
      />
    )
    initCategoryForm(getByLabelText, getByText)
    // Submit form
    fireEvent.click(getByText('Erstellen'), leftClickOption)
    expect(submitActionStub).toBeCalledTimes(1)
    expect(submitActionStub).toBeCalledWith(categoryCreate)
  })

  test('submit correct with initial values', (): void => {
    const submitActionStub = jest.fn()
    const { getByText } = renderWithAppRoot(
      <CategoryForm
        {...componentProps}
        mode="create"
        initialData={categoryCreate}
        submitAction={submitActionStub}
      />
    )
    // Submit form
    fireEvent.click(getByText('Erstellen'), leftClickOption)
    expect(submitActionStub).toBeCalledTimes(1)
    expect(submitActionStub).toBeCalledWith(categoryCreate)
  })

  test('reset some values when type changes to list', async (): Promise<
    void
  > => {
    const submitActionStub = jest.fn()
    const { getByText, getByLabelText } = renderWithAppRoot(
      <CategoryForm
        {...componentProps}
        mode="create"
        initialData={categoryCreate}
        submitAction={submitActionStub}
      />
    )

    initCategoryForm(getByText, getByLabelText)

    fireEvent.click(getByLabelText('Auswahl Unterkategorie'), leftClickOption)

    fireEvent.mouseDown(getByLabelText('Art'), leftClickOption)
    fireEvent.click(getByText('Liste'), leftClickOption)

    // Submit form
    fireEvent.click(getByText('Erstellen'), leftClickOption)
    expect(submitActionStub).toBeCalledTimes(1)
    expect(submitActionStub).toBeCalledWith({
      ...categoryCreate,
      hasSubcategories: false,
      hasTitle: true,
      type: categoryTypeOptions[1].value,
    })
  })

  test('reset some values when type changes to counter', async (): Promise<
    void
  > => {
    const submitActionStub = jest.fn()
    const { getByText, getByLabelText } = renderWithAppRoot(
      <CategoryForm
        {...componentProps}
        mode="create"
        initialData={categoryCreate}
        submitAction={submitActionStub}
      />
    )

    initCategoryForm(getByText, getByLabelText)

    fireEvent.click(getByLabelText('Auswahl Unterkategorie'), leftClickOption)

    fireEvent.mouseDown(getByLabelText('Art'), leftClickOption)
    fireEvent.click(getByText('Zähler'), leftClickOption)

    // Submit form
    fireEvent.click(getByText('Erstellen'), leftClickOption)
    expect(submitActionStub).toBeCalledTimes(1)
    expect(submitActionStub).toBeCalledWith({
      ...categoryCreate,
      hasSubcategories: false,
      type: categoryTypeOptions[2].value,
    })
  })

  test('use edit button as default submit button', (): void => {
    const { getByText } = renderWithAppRoot(
      <CategoryForm
        {...componentProps}
        initialData={categoryCreate}
        submitAction={(): void => {}}
      />
    )
    expect(getByText('Bearbeiten')).toBeInTheDocument()
  })
})
