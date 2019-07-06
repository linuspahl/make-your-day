// utils
import { fireEvent, Matcher, SelectorMatcherOptions, wait } from 'testUtils'
// fixtures
import { recordCreate, record } from 'store/record/fixtures'

export default async function initRecordForm(
  queryByLabelText: (
    text: Matcher,
    options?: SelectorMatcherOptions
  ) => HTMLElement
): Promise<void> {
  // fill form
  const nameInput = queryByLabelText('Name')
  const descriptionInput = queryByLabelText('Beschreibung')
  const amountInput = queryByLabelText(`Anzahl (${record.category.unit})`)

  if (nameInput) {
    fireEvent.change(nameInput, {
      target: { value: recordCreate.title },
    })
  }
  if (descriptionInput) {
    fireEvent.change(descriptionInput, {
      target: { value: recordCreate.description },
    })
  }
  if (amountInput) {
    fireEvent.change(amountInput, {
      target: { value: recordCreate.amount },
    })
  }
  await wait()
}
