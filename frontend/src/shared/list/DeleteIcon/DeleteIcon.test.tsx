// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import DeleteIcon from './DeleteIcon'
import { DeleteUserSession } from 'store/userSession/mutation'
import { deleteUserSession } from 'store/userSession/update'

describe('DeleteIcon should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(
      <DeleteIcon
        id={1}
        mutation={DeleteUserSession}
        title={'Title'}
        onUpdate={deleteUserSession}
      />
    )
  })
})
