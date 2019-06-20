// utils
import {
  fireEvent,
  leftClickOption,
  Matcher,
  SelectorMatcherOptions,
  wait,
} from 'testUtils'
import { widgetPositionOptions, widgetTypeOptions } from 'params'
// fixtures
import { widgetCreate } from 'store/widget/fixtures'

export default async function initWidgetForm(
  getByLabelText: (
    text: Matcher,
    options?: SelectorMatcherOptions
  ) => HTMLElement,
  getByText: (text: Matcher, options?: SelectorMatcherOptions) => HTMLElement
): Promise<void> {
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
