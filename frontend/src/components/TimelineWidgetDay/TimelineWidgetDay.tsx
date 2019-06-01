// libraries
import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
// components
import CategorySummary from 'shared/CategorySummary/CategorySummary'
import { Day, Shortcut, Categories } from './styles'
// interface
import { Category } from 'store/category/type'
import moment from 'moment'

interface CategoryEntry extends Category {
  recordAmountSum: number
}

interface Props extends RouteComponentProps {
  categories: CategoryEntry[]
  date: string
}

const TimelineWidgetDay = (props: Props): JSX.Element => {
  const { categories = [], date, history } = props
  return (
    <Day key={date} onClick={(): void => history.push(`/timeline/${date}`)}>
      <Shortcut>{moment(date).format('dd')}</Shortcut>
      <Categories>
        {categories.map(
          (category): JSX.Element => (
            <CategorySummary
              amount={category.recordAmountSum}
              category={category}
              key={category.id}
            />
          )
        )}
      </Categories>
    </Day>
  )
}

export default withRouter(TimelineWidgetDay)
