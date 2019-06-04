// libraries
import * as React from 'react'
import styled from 'styled-components'
// components
import { Category } from './styles'

interface Props {
  size?: 'large'
}

const CategoryLoading = styled(Category)<Props>`
  width: ${(props): number => (props.size !== 'large' ? 40 : 60)}px;
  min-height: 30px;
`

const CategorySummaryPlaceholder = (props: Props): JSX.Element => (
  <CategoryLoading size={props.size} data-testid="CategorySummaryPlaceholder" />
)

export default CategorySummaryPlaceholder
