// libraries
import * as React from 'react'
import { Query } from 'react-apollo'
import { withRouter, RouteComponentProps } from 'react-router-dom'
// utils
import { sortBy } from 'lodash'
// components
import {
  Records,
  NewRecordSection,
  CategoryTitle,
  Category,
  CategoryRecords,
} from './styles'
import ActionRow from 'shared/form/ActionRow/ActionRow'
import Button from 'shared/Button/Button'
import CategoryIconOverview from 'components/CategoryIconOverview/CategoryIconOverview'
import CategorySummary from 'shared/CategorySummary/CategorySummary'
import CenteredSpinner from 'shared/CenteredSpinner/CenteredSpinner'
import ErrorMessage from 'shared/ErrorMessage/ErrorMessage'
import FadeTransition from 'shared/FadeTransition/FadeTransition'
import H1 from 'shared/H1/H1'
import H2 from 'shared/H2/H2'
import NoResult from 'shared/NoResult/NoResult'
// graphql
import { GetRecords } from 'store/record/query'
import { Record as RecordType } from 'store/record/type'
import { CategoryFull } from 'store/category/type'

// needed for prepareCategories function
interface CategoryEnry extends CategoryFull {
  records: RecordType[]
}

interface Props extends RouteComponentProps {
  match: {
    isExact: true
    params: { date: string }
    path: string
    url: string
  }
}

class Timeline extends React.Component<Props> {
  public render(): React.ReactElement {
    const {
      match: {
        params: { date },
      },
    } = this.props

    return (
      <FadeTransition>
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
                  <Category key={category.id}>
                    <CategoryTitle>{category.title}</CategoryTitle>
                    <CategoryRecords>
                      {sortBy(category.records, 'category.id').map(
                        (record: RecordType) => (
                          <CategorySummary
                            amount={
                              category.hasUnit ? Number(record.amount) : 1
                            }
                            category={category}
                            displayTitle={record.category.title}
                            key={record.id}
                            to={`/categories/${category.id}/records/${
                              record.id
                            }/edit`}
                          />
                        )
                      )}
                    </CategoryRecords>
                  </Category>
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
      </FadeTransition>
    )
  }

  private prepareCategories(records: RecordType[]): CategoryEnry[] {
    const categories: { [key: string]: CategoryEnry } = {}
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
    return Object.values(categories)
  }
}

export default withRouter(Timeline)
