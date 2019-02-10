// libraries
import React from 'react'
import { Query } from 'react-apollo'
// utils
import { sortBy, formatUnixDate, getDateString } from 'utils/utils'
import { weekDayLabels } from '../../../config/params'
// components
import Icon from 'shared/Icon/Icon'
import CenteredSpinner from 'shared/CenteredSpinner/CenteredSpinner'
import ErrorMessage from 'shared/ErrorMessage/ErrorMessage'
import NoResult from 'shared/NoResult/NoResult'
import {
  Layout,
  Day,
  Shortcut,
  Categories,
  Category,
  IconWrapper,
  Box,
} from './styles'
// graphql
import { GetRecords } from 'store/record/query.gql'

export default class Timeline extends React.Component {
  constructor(props) {
    super(props)

    this.prepareTimeline = this.prepareTimeline.bind(this)
  }

  render() {
    return (
      <Layout>
        <Box>
          <Query query={GetRecords}>
            {({ loading, error, data }) => {
              if (loading) return <CenteredSpinner />
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
                <Day key={day.date} to={`/timeline/${day.date}`}>
                  <Shortcut>{weekDayLabels[day.shortcut]}</Shortcut>
                  <Categories>
                    {Object.values(day.categories).map(category => {
                      const {
                        color,
                        hasUnit,
                        icon,
                        id,
                        recordAmountSum,
                        unit,
                      } = category
                      return (
                        <Category key={id} color={color}>
                          <IconWrapper>
                            <Icon title={icon} />
                          </IconWrapper>
                          {recordAmountSum}
                          {hasUnit ? unit : '×'}
                        </Category>
                      )
                    })}
                  </Categories>
                </Day>
              ))
            }}
          </Query>
        </Box>
      </Layout>
    )
  }

  prepareTimeline(records) {
    // The timeline object has an array of records as input
    // for each day with a record, we'll create an entry
    // Based on the day we will group all related records by category
    const timeline = {}

    records.forEach(record => {
      const { category: recordCategory } = record
      const category = recordCategory.parent || recordCategory
      const categoryKey = `${category.id}`
      // get createdAt date and format to string
      const createdAtDate = formatUnixDate(record.createdAt)
      const createdAtDay = getDateString(createdAtDate)

      // Check if an entry for the record related day exists
      if (!timeline[createdAtDay]) {
        // If no entry exists, create one
        timeline[createdAtDay] = {
          shortcut: createdAtDate.getDay(),
          date: createdAtDay,
          categories: {},
        }
      }

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
          categoryEnry.recordAmountSum + this.getRecordAmount(record, category)
      }
      timeline[createdAtDay].categories[categoryKey] = categoryEnry
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
