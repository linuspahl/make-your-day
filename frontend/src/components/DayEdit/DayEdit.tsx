// libraries
import * as React from 'react'
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
import FadeTransition from 'shared/FadeTransition/FadeTransition'
import QueryStateHandler from 'shared/QueryStateHandler/QueryStateHandler'
import H1 from 'shared/H1/H1'
import H2 from 'shared/H2/H2'
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

class DayEdit extends React.Component<Props> {
  public render(): JSX.Element {
    const {
      match: {
        params: { date },
      },
    } = this.props
    return (
      <FadeTransition>
        <H1 context="page">{`Einträge ${date}`}</H1>
        <NewRecordSection>
          <H2>Neu erstellen</H2>
          <CategoryIconOverview params={{ createdAt: date }} />
        </NewRecordSection>
        <H2>Bestehende bearbeiten</H2>
        <Records>
          <QueryStateHandler
            errorMessage="Einträge konnten nicht geladen werden"
            queryName="getRecords"
            variables={{ createdAt: date }}
            query={GetRecords}
          >
            {(records: RecordType[]): JSX.Element => {
              const categories = this.prepareCategories(records)
              return (
                <React.Fragment>
                  {Object.values(categories).map(
                    (category): JSX.Element => {
                      return (
                        <Category key={category.id}>
                          <CategoryTitle>{category.title}</CategoryTitle>
                          <CategoryRecords>
                            {sortBy(category.records, 'category.id').map(
                              (record: RecordType): React.ReactNode => (
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
                    }
                  )}
                </React.Fragment>
              )
            }}
          </QueryStateHandler>
        </Records>
        <ActionRow>
          <Button to="/" context="secondary">
            Zum Dashboard
          </Button>
        </ActionRow>
      </FadeTransition>
    )
  }

  private prepareCategories(records: RecordType[] = []): CategoryEnry[] {
    const categories: { [key: string]: CategoryEnry } = {}
    records.forEach(
      (record): void => {
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
      }
    )
    return Object.values(categories)
  }
}

export default withRouter(DayEdit)
