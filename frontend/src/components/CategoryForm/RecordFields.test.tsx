// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import RecordFields from './RecordFields'

describe('RecordFields should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(
      <RecordFields
        handleInputChange={() => {}}
        hasDescription={false}
        hasSubcategories={false}
        hasTitle={false}
        hasUnit={true}
        type="journal"
      />
    )
  })
})
