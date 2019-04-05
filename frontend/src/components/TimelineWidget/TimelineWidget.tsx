// libraries
import * as React from 'react'
import { Query } from 'react-apollo'
import moment from 'moment'
import { sortBy } from 'lodash'
// utils
import { formatUnixDate, getDateString } from 'utils/utils'
import { fill } from 'lodash'
// components
import ErrorMessage from 'shared/ErrorMessage/ErrorMessage'
import PlaceholderGroup from 'shared/PlaceholderGroup/PlaceholderGroup'
import { Layout, Outer } from './styles'
// graphql
import { GetRecords } from 'store/record/query'
import TimelineWidgetDay from 'components/TimelineWidgetDay/TimelineWidgetDay'
import TimelineWidgetDayPlaceholder from 'components/TimelineWidgetDay/TimelineWidgetDayPlaceholder'
// interfaces
import { Record } from 'store/record/type'
import { Category } from 'store/category/type'

interface CategoryEntry extends Category {
  recordAmountSum: number
}

interface DayEntry {
  categories: { [key: string]: CategoryEntry }
  date: string
}

const LoadingPlaceholder = (): React.ReactElement => (
  <PlaceholderGroup>
    {fill(Array(3), null).map((value, key) => {
      return <TimelineWidgetDayPlaceholder key={key} />
    })}
  </PlaceholderGroup>
)

export default class TimelineWidget extends React.Component {
  public constructor(props: {}) {
    super(props)

    this.prepareTimeline = this.prepareTimeline.bind(this)
  }

  public render(): React.ReactElement {
    const createdAt = new Date()
    // Change it so that it is 7 days in the past.
    createdAt.setDate(createdAt.getDate() - 7)

    return (
      <Outer>
        <Layout>
          <Query
            query={GetRecords}
            variables={{
              createdAtFrom: getDateString(createdAt),
            }}
          >
            {({ loading, error, data }) => {
              if (loading) return <LoadingPlaceholder />

              if (error)
                return (
                  <ErrorMessage
                    error={error}
                    message="Einträge konnten nicht geladen werden"
                  />
                )

              const timeline = this.prepareTimeline(data.getRecords)

              return sortBy(Object.values(timeline), 'date').map(day => (
                <TimelineWidgetDay
                  categories={Object.values(day.categories)}
                  date={day.date}
                  key={day.date}
                />
              ))
            }}
          </Query>
        </Layout>
      </Outer>
    )
  }

  private prepareTimeline(records: Record[]): { [key: string]: DayEntry } {
    // The timeline object has an array of records as input
    // for each day with a record, we'll create an entry
    // Based on the day we will group all related records by category

    const timeline: { [key: string]: DayEntry } = {}

    // First we start by adding a key to the timeline for the last seven days
    for (let index = 0; index <= 6; index++) {
      // Define a new date and set the date based on the index
      // E.g. today - 0 results in days, today - 1 will result in yesterdays date, etc.
      const day = moment().subtract(index, 'days')
      const dayDate = moment(day).format('YYYY-MM-DD')
      timeline[dayDate] = {
        categories: {},
        date: dayDate,
      }
    }

    records.forEach(record => {
      const { category: recordCategory } = record
      const category = recordCategory.parent || recordCategory
      const categoryKey = `${category.id}`
      // get createdAt date and format to string
      const createdAtDate = formatUnixDate(record.createdAt)
      const createdAtDay = getDateString(createdAtDate)

      if (timeline[createdAtDay]) {
        // Check if an entry for the category exists
        let categoryEnry = timeline[createdAtDay].categories[categoryKey]
        if (!categoryEnry) {
          // If no entry exists, create one and set the amount of the record
          categoryEnry = {
            ...category,
            recordAmountSum: this.getRecordAmount(record, category),
          }
        } else {
          // Otherwise only sum up the record amount
          categoryEnry.recordAmountSum =
            categoryEnry.recordAmountSum +
            this.getRecordAmount(record, category)
        }
        timeline[createdAtDay].categories[categoryKey] = categoryEnry
      }
    })

    return timeline
  }

  private getRecordAmount(record: Record, category: Category): number {
    if (category.hasUnit && category.type !== 'counter') {
      return parseInt(record.amount, 10)
    }
    return 1
  }
}
