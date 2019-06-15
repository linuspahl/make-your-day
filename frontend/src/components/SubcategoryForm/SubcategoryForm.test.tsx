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
// fixtures
import { subcategoryCreate, category } from 'store/category/fixtures'
// components
import SubcategoryForm from 'components/SubcategoryForm/SubcategoryForm'

const componentProps = {
  rootPath: `/category/${category.id}/subcategory/create`,
}

export const initSubcategoryForm = async (
  getByLabelText: (
    text: Matcher,
    options?: SelectorMatcherOptions
  ) => HTMLElement
): Promise<void> => {
  // fill form
  fireEvent.change(getByLabelText('Name'), {
    target: { value: category.subcategories[0].title },
  })
  await wait()
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
        parentCategory={category}
      />
    )
    initSubcategoryForm(getByLabelText)
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
        parentCategory={category}
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
        parentCategory={category}
      />
    )
    expect(getByText('Bearbeiten')).toBeInTheDocument()
  })
})
