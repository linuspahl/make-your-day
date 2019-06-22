// libraries
import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Mutation, Query, FetchResult } from 'react-apollo'
import { ApolloError } from 'apollo-boost'
import { DataProxy } from 'apollo-cache'
// utils
import { extractIdFromUrl, logError, parseQueryParams } from 'utils/utils'
// components
import FadeTransition from 'shared/FadeTransition/FadeTransition'
import H1 from 'shared/H1/H1'
import SubcategoryForm from 'components/SubcategoryForm/SubcategoryForm'
// graphql
import { addSubcategory } from 'store/category/update'
import { CreateSubcategory } from 'store/category/mutation'
import { GetCategory } from 'store/category/query'
// interfaces
import { CategoryCreate, Category } from 'store/category/type'
import { NotificationCreate } from 'types/types'
import QueryStateHandler from 'shared/QueryStateHandler/QueryStateHandler'

interface Props extends RouteComponentProps {
  createNotificationBanner: (notification: NotificationCreate) => void
  rootPath: string
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
      <FadeTransition>
        <H1 context="page">Subkategorie erstellen</H1>
        <QueryStateHandler
          errorMessage="Kategorie konnten nicht geladen werden"
          query={GetCategory}
          queryName="getCategory"
          variables={{ id: categoryId }}
        >
          {(parentCategory: Category): JSX.Element => (
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
                  variables: CategoryCreate
                }) => void
              ): JSX.Element => (
                <SubcategoryForm
                  mode="create"
                  rootPath={rootPath}
                  submitAction={(variables: CategoryCreate): void =>
                    createSubcategory({ variables })
                  }
                  parentCategory={parentCategory}
                />
              )}
            </Mutation>
          )}
        </QueryStateHandler>
      </FadeTransition>
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
