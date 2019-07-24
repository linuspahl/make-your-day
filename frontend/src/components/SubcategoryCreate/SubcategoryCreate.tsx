// libraries
import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Mutation, FetchResult } from 'react-apollo'
import { ApolloError } from 'apollo-boost'
import { DataProxy } from 'apollo-cache'
// utils
import { extractIdFromUrl, logError, parseQueryParams } from 'utils/utils'
// components
import H1 from 'shared/H1/H1'
import PageQueryHandler from 'shared/PageQueryHandler/PageQueryHandler'
import SubcategoryForm from 'components/SubcategoryForm/SubcategoryForm'
// graphql
import { addSubcategory } from 'store/category/update'
import { CreateSubcategory } from 'store/category/mutation'
import { GetCategory } from 'store/category/query'
// interfaces
import {
  SubcategoryCreate as SubcategoryCreateType,
  Category,
} from 'store/category/type'
import { NotificationCreate } from 'types/types'

interface Props extends RouteComponentProps {
  createNotificationBanner: (notification: NotificationCreate) => void
  rootPath: string
}

interface PageQueryResult {
  data: { getCategory: Category }
  status: { getCategory: JSX.Element }
}

class SubcategoryCreate extends React.Component<Props> {
  public constructor(props: Props) {
    super(props)

    this.handleCompleted = this.handleCompleted.bind(this)
    this.handleError = this.handleError.bind(this)
  }

  public render(): JSX.Element {
    const { match, rootPath } = this.props
    const categoryId = extractIdFromUrl(match)
    return (
      <PageQueryHandler
        errorMessages={{
          getCategory: 'Kategorie konnten nicht geladen werden',
        }}
        query={GetCategory}
        queryNames={['getCategory']}
        variables={{ id: categoryId }}
      >
        {({
          data: { getCategory: parentCategory },
          status: { getCategory: getCategoryStatus },
        }: PageQueryResult): JSX.Element => (
          <React.Fragment>
            <H1 context="page">Subkategorie erstellen</H1>
            {getCategoryStatus}
            {!getCategoryStatus && parentCategory && (
              <Mutation
                mutation={CreateSubcategory}
                onCompleted={this.handleCompleted}
                onError={this.handleError}
                update={(cache: DataProxy, data: FetchResult): void =>
                  addSubcategory(cache, data, { id: categoryId })
                }
              >
                {(
                  createSubcategory: ({
                    variables,
                  }: {
                    variables: SubcategoryCreateType
                  }) => void
                ): JSX.Element => (
                  <SubcategoryForm
                    mode="create"
                    rootPath={rootPath}
                    submitAction={(variables: SubcategoryCreateType): void =>
                      createSubcategory({ variables })
                    }
                    parentCategoryId={parentCategory.id}
                  />
                )}
              </Mutation>
            )}
          </React.Fragment>
        )}
      </PageQueryHandler>
    )
  }

  // Form submit function
  private handleCompleted(data: { createSubcategory: Category }): void {
    const {
      createNotificationBanner,
      history,
      location: { search },
      rootPath,
    } = this.props
    const queryParams: { source?: string } = parseQueryParams(search)
    const { source } = queryParams
    const {
      createSubcategory: { id, title, parentId },
    } = data

    // Inform user about success
    createNotificationBanner({
      type: 'success',
      message: `Subkategorie ${title} erfolgreich erstellt`,
    })

    if (source === 'createRecord') {
      // Go to the subcategories overview
      history.push(`${rootPath}/${parentId}/records/create?subCategoryId=${id}`)
    } else {
      // By default Go to the subcategories overview
      history.push(`${rootPath}/${parentId}/subcategories`)
    }
  }

  // Form error function
  private handleError(error: ApolloError): void {
    const { createNotificationBanner } = this.props
    createNotificationBanner({
      type: 'error',
      message: 'Erstellung der Subkategorie fehlgeschlagen',
    })
    logError(error)
  }
}

export default withRouter(SubcategoryCreate)
