// libraries
import React from 'react'
import styled from 'styled-components'
// components
import { Category } from './styles'

interface Props {
  size?: 'large'
}

const CategoryLoading = styled(Category)<Props>`
  width: ${(props): string => `${props.size !== 'large' ? 2.5 : 3.75}rem`};
  min-height: 1.875rem;
`

const CategorySummaryPlaceholder = ({ size }: Props): JSX.Element => (
  <CategoryLoading size={size} data-testid="CategorySummaryPlaceholder" />
)

export default CategorySummaryPlaceholder
