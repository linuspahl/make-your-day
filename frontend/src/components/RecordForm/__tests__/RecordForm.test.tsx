// libraries
import * as React from 'react'
// utils
import initRecordForm from 'components/RecordForm/__tests__/initRecordForm'
import {
  cleanup,
  fireEvent,
  leftClickOption,
  renderWithAppRoot,
  wait,
} from 'testUtils'
// components
import RecordForm from 'components/RecordForm/RecordForm'
// fixtures
import { category } from 'store/category/fixtures'
import { recordCreate, record } from 'store/record/fixtures'

const componentProps = {
  rootPath: `/category/${record.category.id}/record/create`,
  category,
  submitAction: (): void => {},
}

describe('RecordForm should', (): void => {
  afterEach(cleanup)

  test('submit with correct values', async (): Promise<void> => {
    // If category has no subcategories, the provided category shoul be submitted
    const submitActionStub = jest.fn()
    const { getByText, getByLabelText } = renderWithAppRoot(
      <RecordForm
        {...componentProps}
        category={{
          ...record.category,
          hasTitle: true,
          hasDescription: true,
          hasUnit: true,
          hasSubcategories: false,
          subcategories: [],
        }}
        params={{
          createdAt: record.createdAt,
          subcategoryId: record.category.id,
        }}
        mode="create"
        submitAction={submitActionStub}
      />
    )
    initRecordForm(getByLabelText)
    // Submit form
    fireEvent.click(getByText('Erstellen'), leftClickOption)
    await wait()
    expect(submitActionStub).toBeCalledTimes(1)
    expect(submitActionStub).toBeCalledWith({
      ...recordCreate,
      createdAt: record.createdAt,
    })
  })

  test('show link for new subcategory form in subcategory select', async (): Promise<
    void
  > => {
    const { getByTestId, getByText } = renderWithAppRoot(
      <RecordForm {...componentProps} category={category} mode="create" />
    )
    fireEvent.mouseDown(getByTestId('ContentSelect-selection'), leftClickOption)
    expect(getByText('Weitere Unterkategorie anlegen')).toBeInTheDocument()
  })

  test('show tite input, if related category has hasTitle prop', (): void => {
    const { getByLabelText } = renderWithAppRoot(
      <RecordForm
        {...componentProps}
        category={{ ...category, hasTitle: true }}
        mode="create"
      />
    )
    expect(getByLabelText('Name')).toBeInTheDocument()
  })

  test('show subcategory select, if related category has hasSubcategories prop', (): void => {
    const { getByLabelText } = renderWithAppRoot(
      <RecordForm
        {...componentProps}
        category={{ ...category, hasSubcategories: true }}
        mode="create"
      />
    )
    expect(getByLabelText('Unterkategorie')).toBeInTheDocument()
  })

  test('show description textarea, if related category has hasDescription prop', (): void => {
    const { getByLabelText } = renderWithAppRoot(
      <RecordForm
        {...componentProps}
        category={{ ...category, hasDescription: true }}
        mode="create"
      />
    )
    expect(getByLabelText('Beschreibung')).toBeInTheDocument()
  })

  test('show unit input, if related category has hasUnit prop', (): void => {
    const { getByLabelText } = renderWithAppRoot(
      <RecordForm
        {...componentProps}
        category={{ ...category, hasUnit: true }}
        mode="create"
      />
    )
    expect(getByLabelText(`Anzahl (${category.unit})`)).toBeInTheDocument()
  })

  test('submit before ', (): void => {
    const submitActionStub = jest.fn()
    renderWithAppRoot(
      <RecordForm
        {...componentProps}
        category={{ ...category, type: 'counter' }}
        mode="create"
        submitAction={submitActionStub}
      />
    )
    expect(submitActionStub).toBeCalledTimes(1)
    expect(submitActionStub).toBeCalledWith({
      amount: null,
      categoryId: 11,
      createdAt: null,
      description: null,
      title: null,
    })
  })

  test('use edit button as default submit button', (): void => {
    const { getByText } = renderWithAppRoot(
      <RecordForm
        {...componentProps}
        category={{ ...category, hasUnit: true }}
        initialData={record}
      />
    )
    expect(getByText('Bearbeiten')).toBeInTheDocument()
  })
})
