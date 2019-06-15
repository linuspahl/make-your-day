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
import { widgetPositionOptions, widgetTypeOptions } from 'params'
// components
import WidgetForm from './WidgetForm'
// fixtures
import { widgetCreate } from 'store/widget/fixtures'
import { evaluation } from 'store/evaluation/fixtures'

const componentProps = {
  rootPath: '/widget/create',
}

export const initWidgetForm = async (
  getByLabelText: (
    text: Matcher,
    options?: SelectorMatcherOptions
  ) => HTMLElement,
  getByText: (text: Matcher, options?: SelectorMatcherOptions) => HTMLElement
): Promise<void> => {
  // fill form
  fireEvent.change(getByLabelText('Name'), {
    target: { value: widgetCreate.title },
  })
  fireEvent.mouseDown(getByLabelText('Art'), leftClickOption)
  fireEvent.click(getByText(widgetTypeOptions[0].title), leftClickOption)

  fireEvent.mouseDown(getByLabelText('Position'), leftClickOption)
  fireEvent.click(getByText(widgetPositionOptions[0].title), leftClickOption)

  await wait()
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

    fireEvent.mouseDown(
      getByLabelText('Verknüpfte Auswertung'),
      leftClickOption
    )
    expect(getByText(evaluation.title)).toBeInTheDocument()
  })

  test('use edit button as default submit button', (): void => {
    const { getByText } = renderWithAppRoot(
      <WidgetForm {...componentProps} submitAction={(): void => {}} />
    )
    expect(getByText('Bearbeiten')).toBeInTheDocument()
  })
})
