// libraries
import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import { ApolloError } from 'apollo-boost'
// utils
import { extractIdFromUrl, logError } from 'utils/utils'
// components
import H1 from 'shared/H1/H1'
import SubcategoryForm from 'components/SubcategoryForm/SubcategoryForm'
import PageQueryHandler from 'shared/PageQueryHandler/PageQueryHandler'
// graphql
import { UpdateSubcategory } from 'store/category/mutation'
import { GetSubcategory } from 'store/category/query'
// interface
import { NotificationCreate } from 'types/types'
import {
  Category,
  Subcategory,
  SubcategoryEdit as SubcategoryEditType,
} from 'store/category/type'

interface Props extends RouteComponentProps {
  createNotificationBanner: (notification: NotificationCreate) => void
  rootPath: string
}

interface PageQueryResult {
  data: { getCategory: Category }
  status: { getCategory: JSX.Element }
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
      <PageQueryHandler
        dataTestId="SubcategoryEdit"
        errorMessages={{
          getCategory: 'Subkategorie konnte nicht geladen werden',
        }}
        query={GetSubcategory}
        queryNames={['getCategory']}
        variables={{ id: categoryId }}
      >
        {({
          data: { getCategory: subcategory },
          status: { getCategory: getCategoryStatus },
        }: PageQueryResult): JSX.Element => (
          <React.Fragment>
            <H1 context="page">Subkategorie bearbeiten</H1>
            {getCategoryStatus}
            {!getCategoryStatus && subcategory && (
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
                      title: subcategory.title,
                      color: subcategory.color,
                    }}
                    rootPath={rootPath}
                    parentCategoryId={subcategory.parentId}
                    submitAction={(variables: SubcategoryEditType): void => {
                      updateCategory({
                        variables: {
                          id: subcategory.id,
                          title: variables.title,
                          color: variables.color,
                        },
                      })
                    }}
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
