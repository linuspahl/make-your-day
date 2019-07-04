// libraries
import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import { ApolloError } from 'apollo-boost'
// utils
import { extractIdFromUrl, logError } from 'utils/utils'
// components
import FadeTransition from 'shared/FadeTransition/FadeTransition'
import H1 from 'shared/H1/H1'
import SubcategoryForm from 'components/SubcategoryForm/SubcategoryForm'
// graphql
import { UpdateSubcategory } from 'store/category/mutation'
import { GetSubcategory } from 'store/category/query'
// interface
import { NotificationCreate } from 'types/types'
import { Category, Subcategory, SubcategoryUpdate } from 'store/category/type'
import QueryStateHandler from 'shared/QueryStateHandler/QueryStateHandler'

interface Props extends RouteComponentProps {
  createNotificationBanner: (notification: NotificationCreate) => void
  rootPath: string
}

class SubcategoryEdit extends React.Component<Props> {
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
        <H1 context="page">Subkategorie bearbeiten</H1>
        <QueryStateHandler
          query={GetSubcategory}
          variables={{ id: categoryId }}
          queryName="getCategory"
          errorMessage="Subkategorie konnte nicht geladen werden"
        >
          {(subcategory: Subcategory): JSX.Element => (
            <Mutation
              mutation={UpdateSubcategory}
              onCompleted={this.handleCompleted}
              onError={this.handleError}
            >
              {(
                updateCategory: ({
                  variables,
                }: {
                  variables: Subcategory
                }) => void
              ): JSX.Element => (
                <SubcategoryForm
                  initialData={{
                    parentId: subcategory.parentId,
                    title: subcategory.title,
                  }}
                  rootPath={rootPath}
                  parentCategoryId={subcategory.parentId}
                  submitAction={(variables: SubcategoryUpdate): void => {
                    updateCategory({
                      variables: { id: subcategory.id, title: variables.title },
                    })
                  }}
                />
              )}
            </Mutation>
          )}
        </QueryStateHandler>
      </FadeTransition>
    )
  }

  // Form submit function
  private handleCompleted(data: { updateCategory: Category }): void {
    const { history, rootPath, createNotificationBanner } = this.props
    const {
      updateCategory: { parentId, title },
    } = data

    // Inform user about success
    createNotificationBanner({
      type: 'success',
      message: `Subkategorie ${title} erfolgreich bearbeitet`,
    })

    // Go to the subcategories overview
    history.push(`${rootPath}/${parentId}/subcategories`)
  }

  // Form error function
  private handleError(error: ApolloError): void {
    const { createNotificationBanner } = this.props
    createNotificationBanner({
      type: 'error',
      message: 'Bearbeitung der Subkategorie fehlgeschlagen',
    })
    logError(error)
  }
}

export default withRouter(SubcategoryEdit)
