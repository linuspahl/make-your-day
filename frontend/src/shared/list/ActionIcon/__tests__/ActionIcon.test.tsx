// libraries
import React from 'react'
import { renderWithAppRoot, cleanup } from 'testUtils'
// components
import ActionIcon from 'shared/list/ActionIcon/ActionIcon'

describe('ActionIcon should', (): void => {
  afterEach(cleanup)

  test('render without crashing', (): void => {
    const { getByTestId } = renderWithAppRoot(
      <ActionIcon icon="edit" ariaLabel="Edit Category" to="/category-edit" />
    )
    expect(getByTestId('ActionIcon')).toBeInTheDocument()
  })

  test('work as a link, when target is provided', (): void => {
    const target = '/cateogry-edit'
    const { getByTestId } = renderWithAppRoot(
      <ActionIcon icon="edit" ariaLabel="Edit Category" to={target} />
    )
    expect(getByTestId('ActionIcon').getAttribute('href')).toBe(target)
    expect(getByTestId('ActionIcon').nodeName).toBe('A')
  })
})
