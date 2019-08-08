// libraries
import * as React from 'react'
// utils
import {
  renderWithAppRoot,
  fireEvent,
  leftClickOption,
  cleanup,
  wait,
} from 'testUtils'
// components
import DeleteButton from 'shared/DeleteButton/DeleteButton'
// graphql
import { DeleteUserSession } from 'store/userSession/mutation'
// fixtures
import { deleteUserSessionSuccess } from 'store/userSession/fixtures'

describe('DeleteButton should', (): void => {
  const { id: userSessionId } = deleteUserSessionSuccess.request.variables
  // mock window confirm method
  afterEach(cleanup)

  test('render without crashing', (): void => {
    const onUpdateStub = jest.fn()
    const onDeleteStub = jest.fn()
    const { getByText } = renderWithAppRoot(
      <DeleteButton
        id={userSessionId}
        mutation={DeleteUserSession}
        title="Lösche Sitzing"
        onUpdate={onUpdateStub}
        onDelete={onDeleteStub}
      />,
      { mocks: [deleteUserSessionSuccess] }
    )
    expect(getByText('Löschen')).toBeInTheDocument()
  })

  test('update store on successful delete', async (): Promise<void> => {
    window.confirm = (): boolean => true

    const onUpdateStub = jest.fn()
    const onDeleteStub = jest.fn()
    const { getByText } = renderWithAppRoot(
      <DeleteButton
        id={'1'}
        mutation={DeleteUserSession}
        onDelete={onDeleteStub}
        onUpdate={onUpdateStub}
        title="Lösche Sitzing"
      />,
      { mocks: [deleteUserSessionSuccess] }
    )
    fireEvent.click(getByText('Löschen'), leftClickOption)
    // Wait for the Mutation component
    await wait()
    expect(onUpdateStub).toBeCalledTimes(1)
  })

  test('not update store, if user does not confirm delete', async (): Promise<
    void
  > => {
    window.confirm = (): boolean => false

    const onUpdateStub = jest.fn()
    const onDeleteStub = jest.fn()
    const { getByText } = renderWithAppRoot(
      <DeleteButton
        id={'1'}
        mutation={DeleteUserSession}
        title="Lösche Sitzing"
        onUpdate={onUpdateStub}
        onDelete={onDeleteStub}
      />,
      { mocks: [deleteUserSessionSuccess] }
    )
    fireEvent.click(getByText('Löschen'), leftClickOption)
    // Wait for the Mutation component
    await wait()
    expect(onUpdateStub).not.toBeCalled()
  })
})
