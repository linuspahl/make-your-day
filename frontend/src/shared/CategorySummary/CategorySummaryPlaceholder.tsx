// libraries
import * as React from 'react'
import styled from 'styled-components'
// components
import { Category } from './styles'

interface Props {
  size?: 'large'
}

const CategoryLoading = styled(Category)<Props>`
  width: ${props => (props.size === 'large' ? 60 : 40)}px;
  min-height: 30px;
`

const CategorySummaryPlaceholder = (props: Props) => (
  <CategoryLoading size={props.size} />
)

export default CategorySummaryPlaceholder
