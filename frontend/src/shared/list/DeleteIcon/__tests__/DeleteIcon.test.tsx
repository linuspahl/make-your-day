// libraries
import * as React from 'react'
// utils
import {
  cleanup,
  fireEvent,
  leftClickOption,
  renderWithAppRoot,
  wait,
} from 'testUtils'
// components
import DeleteIcon from 'shared/list/DeleteIcon/DeleteIcon'
// graphql
import { DeleteUserSession } from 'store/userSession/mutation'
// fixtures
import { deleteUserSessionSuccess } from 'store/userSession/fixtures'

describe('DeleteIcon should', (): void => {
  const { id: userSessionId } = deleteUserSessionSuccess.request.variables
  // mock window confirm method
  afterEach(cleanup)

  test('render without crashing', (): void => {
    const onUpdateStub = jest.fn()
    const { getByTestId } = renderWithAppRoot(
      <DeleteIcon
        id={userSessionId}
        mutation={DeleteUserSession}
        title="Lösche Sitzing"
        ariaLabel="Lösche Sitzung"
        onUpdate={onUpdateStub}
      />,
      { mocks: [deleteUserSessionSuccess] }
    )
    expect(getByTestId('Icon')).toBeInTheDocument()
  })

  test('update store on successful delete', async (): Promise<void> => {
    window.confirm = (): boolean => true

    const onUpdateStub = jest.fn()
    const { getByTestId } = renderWithAppRoot(
      <DeleteIcon
        id={'1'}
        mutation={DeleteUserSession}
        title="Lösche Sitzing"
        ariaLabel="Lösche Sitzung"
        onUpdate={onUpdateStub}
      />,
      { mocks: [deleteUserSessionSuccess] }
    )
    fireEvent.click(getByTestId('Icon'), leftClickOption)
    // Wait for the Mutation component
    await wait()
    expect(onUpdateStub).toBeCalledTimes(1)
  })

  test('not update store, if user does not confirm delete', async (): Promise<
    void
  > => {
    window.confirm = (): boolean => false

    const onUpdateStub = jest.fn()
    const { getByTestId } = renderWithAppRoot(
      <DeleteIcon
        id={'1'}
        mutation={DeleteUserSession}
        title="Lösche Sitzing"
        ariaLabel="Lösche Sitzung"
        onUpdate={onUpdateStub}
      />,
      { mocks: [deleteUserSessionSuccess] }
    )
    fireEvent.click(getByTestId('Icon'), leftClickOption)
    // Wait for the Mutation component
    await wait()
    expect(onUpdateStub).not.toBeCalled()
  })
})
