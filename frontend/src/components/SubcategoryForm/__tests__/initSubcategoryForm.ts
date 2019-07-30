// utils
import {
  fireEvent,
  Matcher,
  SelectorMatcherOptions,
  wait,
  leftClickOption,
} from 'testUtils'
// fixtures
import { category } from 'store/category/fixtures'

export default async function initSubcategoryForm(
  getByLabelText: (
    text: Matcher,
    options?: SelectorMatcherOptions
  ) => HTMLElement,
  getByText: (text: Matcher, options?: SelectorMatcherOptions) => HTMLElement
): Promise<void> {
  // fill form
  fireEvent.change(getByLabelText('Name'), {
    target: { value: category.subcategories[0].title },
  })
  fireEvent.mouseDown(getByLabelText('Farbe'), leftClickOption)
  fireEvent.click(getByText(category.subcategories[0].color), leftClickOption)
  await wait()
}
