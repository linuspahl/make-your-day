// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import RecordFields from 'components/CategoryForm/RecordFields'

describe('RecordFields should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(
      <RecordFields
        handleInputChange={(): void => {}}
        hasDescription={false}
        hasSubcategories={false}
        hasTitle={false}
        hasUnit={true}
        type="journal"
      />
    )
  })
})
