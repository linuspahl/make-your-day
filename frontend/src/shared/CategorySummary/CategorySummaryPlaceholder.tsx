// libraries
import * as React from 'react'
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

const CategorySummaryPlaceholder = (props: Props): JSX.Element => (
  <CategoryLoading size={props.size} data-testid="CategorySummaryPlaceholder" />
)

export default CategorySummaryPlaceholder
