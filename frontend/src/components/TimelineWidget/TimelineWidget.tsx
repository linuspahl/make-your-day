// libraries
import React from 'react'
import dayjs from 'dayjs'
import { sortBy, fill } from 'lodash'
// components
import PlaceholderGroup from 'shared/PlaceholderGroup/PlaceholderGroup'
import { Layout, Outer } from './styles'
// graphql
import { GetRecords } from 'store/record/query'
import TimelineWidgetDay from 'components/TimelineWidgetDay/TimelineWidgetDay'
import TimelineWidgetDayPlaceholder from 'components/TimelineWidgetDay/TimelineWidgetDayPlaceholder'
// interfaces
import { Record } from 'store/record/type'
import { Category } from 'store/category/type'
import QueryStateHandler from 'shared/QueryStateHandler/QueryStateHandler'

interface CategoryEntry extends Category {
  recordAmountSum: number
}

interface DayEntry {
  categories: { [key: string]: CategoryEntry }
  date: string
}

const LoadingPlaceholder = (
  <PlaceholderGroup>
    {fill(Array(7), null).map(
      (value, key): JSX.Element => {
        return <TimelineWidgetDayPlaceholder key={key} />
      }
    )}
  </PlaceholderGroup>
)

const getRecordAmount = (record: Record, category: Category): number => {
  if (category.hasUnit && category.type !== 'counter') {
    return record.amount
  }
  return 1
}

const prepareTimeline = (records: Record[]): { [key: string]: DayEntry } => {
  // The timeline object has an array of records as input
  // for each day with a record, we'll create an entry
  // Based on the day we will group all related records by category

  const timeline: { [key: string]: DayEntry } = {}

  // First we start by adding a key to the timeline for the last seven days
  for (let index = 0; index <= 6; index++) {
    // Define a new date and set the date based on the index
    // E.g. today - 0 results in days, today - 1 will result in yesterdays date, etc.
    const day = dayjs().subtract(index, 'day')
    const dayDate = dayjs(day).format('YYYY-MM-DD')
    timeline[dayDate] = {
      categories: {},
      date: dayDate,
    }
  }

  records.forEach((record): void => {
    const { category: recordCategory } = record
    const category = recordCategory.parent || recordCategory
    const categoryKey = `${category.id}`
    // get createdAt date and format to string
    const recordCreatedAtUnix = parseInt(record.createdAt)
    const createdAtDay = dayjs(recordCreatedAtUnix).format('YYYY-MM-DD')
    if (timeline[createdAtDay]) {
      // Check if an entry for the category exists
      let categoryEnry = timeline[createdAtDay].categories[categoryKey]
      if (!categoryEnry) {
        // If no entry exists, create one and set the amount of the record
        categoryEnry = {
          ...category,
          recordAmountSum: getRecordAmount(record, category),
        }
      } else {
        // Otherwise only sum up the record amount
        categoryEnry.recordAmountSum =
          categoryEnry.recordAmountSum + getRecordAmount(record, category)
      }
      timeline[createdAtDay].categories[categoryKey] = categoryEnry
    }
  })

  return timeline
}

const TimelineWidget = (): JSX.Element => {
  // We want to fetch all posts of the last seven days.
  const createdAt = new Date()
  createdAt.setDate(createdAt.getDate() - 7)
  return (
    <Outer>
      <Layout>
        <QueryStateHandler
          errorMessage="Einträge konnten nicht geladen werden"
          queryName="getRecords"
          query={GetRecords}
          loadingPlaceholder={LoadingPlaceholder}
        >
          {(records: Record[]): JSX.Element => {
            const timeline = prepareTimeline(records)
            return (
              <React.Fragment>
                {sortBy(Object.values(timeline), 'date').map(
                  (day: DayEntry): JSX.Element => (
                    <TimelineWidgetDay
                      categories={Object.values(day.categories)}
                      date={day.date}
                      key={day.date}
                    />
                  )
                )}
              </React.Fragment>
            )
          }}
        </QueryStateHandler>
      </Layout>
    </Outer>
  )
}

export default TimelineWidget
