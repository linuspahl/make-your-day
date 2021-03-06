// libraries
import React from 'react'
// utils
import {
  cleanup,
  fireEvent,
  leftClickOption,
  renderWithAppRoot,
} from 'testUtils'
import initSubcategoryForm from 'components/SubcategoryForm/__tests__/initSubcategoryForm'
// fixtures
import {
  subcategoryCreate,
  category,
  subcategory,
} from 'store/category/fixtures'
// components
import SubcategoryForm from 'components/SubcategoryForm/SubcategoryForm'

const componentProps = {
  rootPath: `/category/${category.id}/subcategory/create`,
}

describe('SubcategoryForm should', (): void => {
  afterEach(cleanup)

  test('submit with correct values', (): void => {
    const submitActionStub = jest.fn()
    const { getByText, getByLabelText } = renderWithAppRoot(
      <SubcategoryForm
        {...componentProps}
        mode="create"
        submitAction={submitActionStub}
        parentCategoryId={subcategory.parentId}
      />
    )
    initSubcategoryForm(getByLabelText, getByText)
    // Submit form
    fireEvent.click(getByText('Erstellen'), leftClickOption)
    expect(submitActionStub).toBeCalledTimes(1)
    expect(submitActionStub).toBeCalledWith(subcategoryCreate)
  })

  test('submit correct with initial values', (): void => {
    const submitActionStub = jest.fn()
    const { getByText } = renderWithAppRoot(
      <SubcategoryForm
        {...componentProps}
        initialData={subcategoryCreate}
        mode="create"
        submitAction={submitActionStub}
        parentCategoryId={subcategory.parentId}
      />
    )
    // Submit form
    fireEvent.click(getByText('Erstellen'), leftClickOption)
    expect(submitActionStub).toBeCalledTimes(1)
    expect(submitActionStub).toBeCalledWith(subcategoryCreate)
  })

  test('use edit button as default submit button', (): void => {
    const { getByText } = renderWithAppRoot(
      <SubcategoryForm
        {...componentProps}
        submitAction={(): void => {}}
        parentCategoryId={subcategory.parentId}
      />
    )
    expect(getByText('Bearbeiten')).toBeInTheDocument()
  })
})
