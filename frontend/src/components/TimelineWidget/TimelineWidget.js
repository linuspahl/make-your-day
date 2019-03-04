// libraries
import React from 'react'
import { Query } from 'react-apollo'
// utils
import { sortBy, formatUnixDate, getDateString } from 'utils/utils'
// components
import ErrorMessage from 'shared/ErrorMessage/ErrorMessage'
import NoResult from 'shared/NoResult/NoResult'
import PlaceholderGroup from 'shared/PlaceholderGroup/PlaceholderGroup'
import { Layout, Outer, FlexboxSpacer } from './styles'
// graphql
import { GetRecords } from 'store/record/query.gql'
import TimelineWidgetDay from 'components/TimelineWidgetDay/TimelineWidgetDay'
import TimelineWidgetDayPlaceholder from 'components/TimelineWidgetDay/TimelineWidgetDayPlaceholder'

const LoadingPlaceholder = () => (
  <PlaceholderGroup>
    {[...Array(3)].map((value, key) => {
      return <TimelineWidgetDayPlaceholder as="div" key={key} />
    })}
  </PlaceholderGroup>
)

export default class TimelineWidget extends React.Component {
  constructor(props) {
    super(props)

    this.prepareTimeline = this.prepareTimeline.bind(this)
  }

  render() {
    return (
      <Outer>
        <Layout>
          <Query
            query={GetRecords}
            variables={{
              createdAtFrom: getDateString(
                new Date().setDate(new Date().getDate() - 7)
              ),
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

              if (data.getRecords.length === 0) return <NoResult />

              const timeline = this.prepareTimeline(data.getRecords)
              return Object.values(timeline).map(day => (
                <TimelineWidgetDay
                  categories={day.categories}
                  date={day.date}
                  key={day.date}
                  shortcut={day.shortcut}
                />
              ))
            }}
          </Query>
        </Layout>
      </Outer>
    )
  }

  prepareTimeline(records) {
    // The timeline object has an array of records as input
    // for each day with a record, we'll create an entry
    // Based on the day we will group all related records by category
    const timeline = {}

    var date = new Date()

    for (let index = 0; index <= 6; index++) {
      const day = new Date(date).setDate(date.getDate() - index)
      const dayDate = getDateString(day)
      timeline[dayDate] = {
        shortcut: index,
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

    return sortBy(Object.values(timeline), 'date')
  }

  getRecordAmount(record, category) {
    if (category.hasUnit && category.type !== 'counter') {
      return parseInt(record.amount, 10)
    }
    return 1
  }
}
