// utils
import { fireEvent, Matcher, SelectorMatcherOptions, wait } from 'testUtils'
// fixtures
import { createRecord, record } from 'store/record/fixtures'

export default async function initRecordForm(
  getByLabelText: (
    text: Matcher,
    options?: SelectorMatcherOptions
  ) => HTMLElement
): Promise<void> {
  // fill form
  fireEvent.change(getByLabelText('Name'), {
    target: { value: createRecord.title },
  })
  fireEvent.change(getByLabelText('Beschreibung'), {
    target: { value: createRecord.description },
  })
  fireEvent.change(getByLabelText(`Anzahl (${record.category.unit})`), {
    target: { value: createRecord.amount },
  })
  await wait()
}
