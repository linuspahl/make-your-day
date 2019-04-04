// libraries
import * as React from 'react'
import { Link } from 'react-router-dom'
// components
import CategorySummary from 'shared/CategorySummary/CategorySummary'
import { Day, Shortcut, Categories } from './styles'
// interface
import { Category } from 'store/category/type'
import moment from 'moment'

interface CategoryEntry extends Category {
  recordAmountSum: number
}

interface Props {
  categories: CategoryEntry[]
  date: string
}

const TimelineWidgetDay = (props: Props): React.ReactElement => {
  const { categories, date } = props
  return (
    <Day key={date}>
      <Link to={`/timeline/${date}`} className="noTextColor" />
      <Shortcut>{moment(date).format('dd')}</Shortcut>
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
