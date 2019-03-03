// libraries
import React from 'react'
// utils
import { weekDayLabels } from '../../../config/params'
// components
import CategorySummary from 'shared/CategorySummary/CategorySummary'
import { Day, Shortcut, Categories } from './styles'

const TimelineWidgetDay = props => {
  const { categories, shortcut, date } = props
  return (
    <Day key={date} to={`/timeline/${date}`}>
      <Shortcut>{weekDayLabels[shortcut]}</Shortcut>
      <Categories>
        {Boolean(categories) &&
          categories.length !== 0 &&
          Object.values(categories).map(category => (
            <CategorySummary
              amount={category.recordAmountSum}
              category={category}
              key={category.id}
            />
          ))}
      </Categories>
    </Day>
  )
}

export default TimelineWidgetDay
