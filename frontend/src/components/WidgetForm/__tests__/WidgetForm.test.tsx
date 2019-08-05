// libraries
import * as React from 'react'
// utils
import {
  cleanup,
  fireEvent,
  leftClickOption,
  renderWithAppRoot,
} from 'testUtils'
import initWidgetForm from 'components/WidgetForm/__tests__/initWidgetForm'
// components
import WidgetForm from 'components/WidgetForm/WidgetForm'
// fixtures
import { widgetCreate } from 'store/widget/fixtures'
import { evaluation } from 'store/evaluation/fixtures'

const componentProps = {
  rootPath: '/widget/create',
}

describe('WidgetForm should', (): void => {
  afterEach(cleanup)

  test('submit with correct values', (): void => {
    const submitActionStub = jest.fn()
    const { getByText, getByLabelText } = renderWithAppRoot(
      <WidgetForm
        {...componentProps}
        mode="create"
        submitAction={submitActionStub}
      />
    )
    initWidgetForm(getByLabelText, getByText)
    // Submit form
    fireEvent.click(getByText('Erstellen'), leftClickOption)
    expect(submitActionStub).toBeCalledTimes(1)
    expect(submitActionStub).toBeCalledWith(widgetCreate)
  })

  test('submit correct with initial values', (): void => {
    const submitActionStub = jest.fn()
    const { getByText } = renderWithAppRoot(
      <WidgetForm
        {...componentProps}
        mode="create"
        initialData={widgetCreate}
        submitAction={submitActionStub}
      />
    )
    // Submit form
    fireEvent.click(getByText('Erstellen'), leftClickOption)
    expect(submitActionStub).toBeCalledTimes(1)
    expect(submitActionStub).toBeCalledWith(widgetCreate)
  })

  test('list evaluations in widget select', async (): Promise<void> => {
    const { getByText, getByLabelText } = renderWithAppRoot(
      <WidgetForm
        {...componentProps}
        mode="create"
        submitAction={(): void => {}}
        evaluations={[evaluation]}
      />
    )
    fireEvent.mouseDown(getByLabelText('Art'), leftClickOption)
    fireEvent.click(getByText('Auswertung'), leftClickOption)

    fireEvent.mouseDown(getByLabelText('Auswertung'), leftClickOption)
    expect(getByText(evaluation.title)).toBeInTheDocument()
  })

  test('use edit button as default submit button', (): void => {
    const { getByText } = renderWithAppRoot(
      <WidgetForm {...componentProps} submitAction={(): void => {}} />
    )
    expect(getByText('Bearbeiten')).toBeInTheDocument()
  })
})
