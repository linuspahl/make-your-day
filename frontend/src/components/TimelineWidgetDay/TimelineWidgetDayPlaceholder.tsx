// libraries
import * as React from 'react'
import styled from 'styled-components'
// components
import { Day, Shortcut, Categories } from './styles'
import CategorySummaryPlaceholder from 'shared/CategorySummary/CategorySummaryPlaceholder'

const ShortcutLoading = styled(Shortcut)`
  background-color: ${props => props.theme.border};
`

const TimelineWidgetDayPlaceholder = () => (
  <Day>
    <ShortcutLoading />
    <Categories>
      <CategorySummaryPlaceholder />
      <CategorySummaryPlaceholder size="large" />
      <CategorySummaryPlaceholder />
    </Categories>
  </Day>
)

export default TimelineWidgetDayPlaceholder
