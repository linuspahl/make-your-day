// libraries
import React from 'react'
import styled from 'styled-components'
// components
import { Category } from './styles'

const CategoryLoading = styled(Category)`
  width: ${props => (props.size === 'small' ? 40 : 60)}px;
  min-height: 30px;
`

const CategorySummaryPlaceholder = props => (
  <CategoryLoading size={props.size} />
)

export default CategorySummaryPlaceholder
