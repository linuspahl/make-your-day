// utils
import {
  fireEvent,
  leftClickOption,
  Matcher,
  SelectorMatcherOptions,
  wait,
} from 'testUtils'
import { categoryTypeOptions, categoryIcons, categoryColors } from 'params'
// fixtures
import { categoryCreate } from 'store/category/fixtures'

export default async function initCategoryForm(
  getByLabelText: (
    text: Matcher,
    options?: SelectorMatcherOptions
  ) => HTMLElement,
  getByText: (text: Matcher, options?: SelectorMatcherOptions) => HTMLElement
): Promise<void> {
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
