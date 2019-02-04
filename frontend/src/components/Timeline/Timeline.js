// libraries
import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import { sortBy, formatUnixDate, getWeekDayNr } from 'utils/utils'
// components
import Icon from 'shared/Icon/Icon'
import CenteredSpinner from 'shared/CenteredSpinner/CenteredSpinner'
import ErrorMessage from 'shared/ErrorMessage/ErrorMessage'
import NoResult from 'shared/NoResult/NoResult'
import ContentBox from 'shared/ContentBox/ContentBox'
// graphql
import { GetRecords } from 'store/record/query.gql'

import {
  Layout,
  Day,
  Shortcut,
  Categories,
  Category,
  Box,
  IconWrapper,
} from './styles'

const days = { 1: 'Mo', 1: 'Di', 3: 'Mi', 4: 'Do', 5: 'Fr', 6: 'Sa', 7: 'So' }

export default class Timeline extends React.Component {
  constructor(props) {
    super(props)

    this.prepareTimeline = this.prepareTimeline.bind(this)
  }

  render() {
    return (
      <Layout>
        <ContentBox>
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

              return Object.values(timeline).map(day => {
                return (
                  <Day key={day.date}>
                    <Shortcut>{days[day.shortcut]}</Shortcut>
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
                            {hasUnit ? unit : '&bull;'}
                          </Category>
                        )
                      })}
                    </Categories>
                  </Day>
                )
              })
            }}
          </Query>
        </ContentBox>
      </Layout>
    )
  }

  prepareTimeline(records) {
    // The timeline object has an array of records as input
    // for each day with a record, we'll create an entry
    // Based on the day we will group all related records by category
    const timeline = {}

    records.forEach(record => {
      const { category } = record
      const categoryKey = `${category.id}`
      // get createdAt date and format to string
      const createdAtDate = formatUnixDate(record.createdAt)

      // Check if an entry for the record related day exists
      if (!timeline[createdAtDate]) {
        // If no entry exists, create one
        timeline[createdAtDate] = {
          shortcut: getWeekDayNr(record.createdAt),
          date: createdAtDate,
          categories: {},
        }
      }

      // Check if an entry for the category exists
      let categoryEnry = timeline[createdAtDate].categories[categoryKey]
      if (!categoryEnry) {
        // If no entry exists, create one and set the amount of the record
        categoryEnry = {
          ...category,
          recordAmountSum: this.getRecordAmount(record),
        }
      } else {
        // Otherwise only sum up the record amount
        categoryEnry.recordAmountSum =
          categoryEnry.recordAmountSum + this.getRecordAmount(record)
      }
      timeline[createdAtDate].categories[categoryKey] = categoryEnry
    })

    return sortBy(Object.values(timeline), 'date')
  }

  getRecordAmount(record) {
    if (record.category.hasUnit) {
      return parseInt(record.amount, 10)
    }
    return 1
  }
}
