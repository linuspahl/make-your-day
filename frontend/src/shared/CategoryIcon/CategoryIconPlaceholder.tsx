// libraries
import * as React from 'react'
// components
import { Circle } from './styles'

interface Props {
  size?: number
}

const CategoryIconPlaceholder = (props: Props) => <Circle size={props.size} />

export default CategoryIconPlaceholder