// libraries
import React from 'react'
// components
import { Circle } from './styles'

interface Props {
  size?: number
}

const CategoryIconPlaceholder = ({ size }: Props): JSX.Element => (
  <Circle size={size} data-testid="CategoryIconPlaceholder" />
)

export default CategoryIconPlaceholder
