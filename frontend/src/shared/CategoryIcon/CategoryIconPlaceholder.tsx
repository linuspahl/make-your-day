// libraries
import * as React from 'react'
// components
import { Circle } from './styles'

interface Props {
  size?: number
}

const CategoryIconPlaceholder = (props: Props): JSX.Element => (
  <Circle size={props.size} data-testid="CategoryIconPlaceholder" />
)

export default CategoryIconPlaceholder
