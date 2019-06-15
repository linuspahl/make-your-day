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
import { categoryTypeOptions, categoryIcons, categoryColors } from 'params'
// components
import CategoryForm from './CategoryForm'
// fixtures
import { categoryCreate } from 'store/category/fixtures'

const componentProps = {
  rootPath: '/category/create',
}

export const initCategoryForm = async (
  getByLabelText: (
    text: Matcher,
    options?: SelectorMatcherOptions
  ) => HTMLElement,
  getByText: (text: Matcher, options?: SelectorMatcherOptions) => HTMLElement
): Promise<void> => {
  // fill form
  fireEvent.change(getByLabelText('Name'), {
    target: { value: categoryCreate.title },
  })
  fireEvent.mouseDown(getByLabelText('Farbe'), leftClickOption)
  fireEvent.click(getByText(Object.keys(categoryColors)[0]), leftClickOption)
  fireEvent.mouseDown(getByLabelText('Icon'), leftClickOption)
  fireEvent.click(getByText(categoryIcons[0].title), leftClickOption)
  fireEvent.mouseDown(getByLabelText('Art'), leftClickOption)
  fireEvent.click(getByText(categoryTypeOptions[0].title), leftClickOption)
  fireEvent.click(getByLabelText('Auswahl Unterkategorie'), leftClickOption)
  fireEvent.click(getByLabelText('Haben Einheit'), leftClickOption)
  fireEvent.change(getByLabelText('Einheit'), {
    target: { value: categoryCreate.unit },
  })
  await wait()
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
})
