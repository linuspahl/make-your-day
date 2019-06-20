// utils
import {
  fireEvent,
  leftClickOption,
  Matcher,
  SelectorMatcherOptions,
  wait,
} from 'testUtils'
import { evaluationTypeOptions, evaluationPeriodOptions } from 'params'
// fixtures
import { evaluation, evaluationCreate } from 'store/evaluation/fixtures'

export default async function initEvaluationForm(
  getByLabelText: (
    text: Matcher,
    options?: SelectorMatcherOptions
  ) => HTMLElement,
  getByText: (text: Matcher, options?: SelectorMatcherOptions) => HTMLElement
): Promise<void> {
  // fill form
  fireEvent.change(getByLabelText('Name'), {
    target: { value: evaluationCreate.title },
  })
  fireEvent.mouseDown(
    getByLabelText('Kategorie / Unterkategorie'),
    leftClickOption
  )
  fireEvent.click(getByText(evaluation.category.title), leftClickOption)

  fireEvent.mouseDown(getByLabelText('Art'), leftClickOption)
  fireEvent.click(getByText(evaluationTypeOptions[0].title), leftClickOption)

  fireEvent.mouseDown(getByLabelText('Zeitraum'), leftClickOption)
  fireEvent.click(getByText(evaluationPeriodOptions[0].title), leftClickOption)
  await wait()
}
