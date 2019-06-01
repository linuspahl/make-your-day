// libraries
import * as React from 'react'
import styled from 'styled-components'
// components
import { Day, Shortcut, Categories } from './styles'
import CategorySummaryPlaceholder from 'shared/CategorySummary/CategorySummaryPlaceholder'

const ShortcutLoading = styled(Shortcut)`
  background-color: ${(props): string => props.theme.border};
`

const DayPlaceholer = styled(Day)`
  cursor: default;
`

const TimelineWidgetDayPlaceholder = (): JSX.Element => (
  <DayPlaceholer>
    <ShortcutLoading />
    <Categories>
      <CategorySummaryPlaceholder />
      <CategorySummaryPlaceholder size="large" />
      <CategorySummaryPlaceholder />
    </Categories>
  </DayPlaceholer>
)

export default TimelineWidgetDayPlaceholder
