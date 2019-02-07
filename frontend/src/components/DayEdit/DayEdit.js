// libraries
import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import { withRouter } from 'react-router-dom'
// utils
import { sortBy } from 'utils/utils'
// components
import ActionRow from 'shared/form/ActionRow/ActionRow'
import Icon from 'shared/Icon/Icon'
import Button from 'shared/Button/Button'
import CenteredSpinner from 'shared/CenteredSpinner/CenteredSpinner'
import ErrorMessage from 'shared/ErrorMessage/ErrorMessage'
import NoResult from 'shared/NoResult/NoResult'
import H1 from 'shared/H1/H1'
import H2 from 'shared/H2/H2'
import CategoryIconOverview from 'components/CategoryIconOverview/CategoryIconOverview'
// graphql
import { GetRecords } from 'store/record/query.gql'

import { Records, Record, IconWrapper, NewRecordSection } from './styles'

class Timeline extends React.Component {
  render() {
    const {
      match: {
        params: { date },
      },
    } = this.props
    return (
      <Fragment>
        <H1 context="page">Einträge {date}</H1>
        <NewRecordSection>
          <H2>Neu erstellen</H2>
          <CategoryIconOverview params={{ createdAt: date }} />
        </NewRecordSection>
        <H2>Bestehende bearbeiten</H2>
        <Records>
          <Query query={GetRecords} variables={{ createdAt: date }}>
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

              const categories = this.prepareCategories(data.getRecords)

              return Object.values(categories).map(category => {
                return (
                  <Fragment key={category.id}>
                    {sortBy(category.records, 'categoryId').map(record => (
                      <Record
                        key={record.id}
                        color={category.color}
                        to={`/categories/${category.id}/records/${
                          record.id
                        }/edit`}
                      >
                        <IconWrapper>
                          <Icon title={category.icon} />
                        </IconWrapper>
                        {category.hasUnit ? record.amount : 1}
                        {category.hasUnit ? category.unit : '×'}
                      </Record>
                    ))}
                  </Fragment>
                )
              })
            }}
          </Query>
        </Records>
        <ActionRow>
          <Button to="/" context="secondary">
            Zum Dashboard
          </Button>
        </ActionRow>
      </Fragment>
    )
  }

  prepareCategories(records) {
    const categories = {}

    records.forEach(record => {
      const category = record.category.parent || record.category

      const categoryKey = `${category.id}`

      let categoryEnry = categories[categoryKey]
      if (categoryEnry) {
        categoryEnry = {
          ...category,
          records: [...categoryEnry.records, record],
        }
      } else {
        categoryEnry = {
          ...category,
          records: [record],
        }
      }
      categories[categoryKey] = categoryEnry
    })
    return categories
  }
}

export default withRouter(Timeline)
