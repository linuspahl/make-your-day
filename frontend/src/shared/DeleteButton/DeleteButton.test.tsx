// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import DeleteButton from './DeleteButton'
// store
import { DeleteUserSession } from 'store/userSession/mutation'
import { deleteUserSession } from 'store/userSession/update'


describe('DeleteButton should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(
      <DeleteButton
        id={1}
        title={'Titel Eintrag'}
        mutation={DeleteUserSession}
        onUpdate={deleteUserSession}
        onDelete={() => {}}
      />)
  })
})
