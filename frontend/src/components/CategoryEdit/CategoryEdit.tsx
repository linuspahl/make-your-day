// libraries
import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import { ApolloError } from 'apollo-boost'
// utils
import { extractIdFromUrl, logError } from 'utils/utils'
// components
import PageQueryHandler from 'shared/PageQueryHandler/PageQueryHandler'
import CategoryForm from 'components/CategoryForm/CategoryForm'
import H1 from 'shared/H1/H1'
// graphql
import { UpdateCategory } from 'store/category/mutation'
import { GetCategory } from 'store/category/query'
// interfaces
import {
  CategoryEdit as CategoryEditType,
  Category,
  CategoryCreate,
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

class CategoryEdit extends React.Component<Props> {
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
        errorMessages={{ getCategory: 'Kategorie konnte nicht geladen werden' }}
        query={GetCategory}
        queryNames={['getCategory']}
        variables={{ id: categoryId }}
      >
        {({
          data: { getCategory: category },
          status: { getCategory: categoryQueryStatus },
        }: PageQueryResult): JSX.Element => {
          const {
            type,
            icon,
            color,
            hasDescription,
            hasSubcategories,
            hasTitle,
            hasUnit,
            title,
            id,
          } = category
          return (
            <React.Fragment>
              <H1 context="page">Kategorie bearbeiten</H1>
              {categoryQueryStatus}
              {!categoryQueryStatus && category && (
                <Mutation
                  mutation={UpdateCategory}
                  onCompleted={this.handleCompleted}
                  onError={this.handleError}
                >
                  {(
                    updateCategory: ({
                      variables,
                    }: {
                      variables: CategoryEditType
                    }) => void
                  ): JSX.Element => (
                    <CategoryForm
                      initialData={{
                        type,
                        icon,
                        color,
                        hasDescription,
                        hasSubcategories,
                        hasTitle,
                        hasUnit,
                        title,
                      }}
                      rootPath={rootPath}
                      submitAction={(variables: CategoryCreate): void =>
                        updateCategory({
                          variables: {
                            color: variables.color,
                            hasDescription: variables.hasDescription,
                            hasTitle: variables.hasTitle,
                            icon: variables.icon,
                            title: variables.title,
                            type: variables.type,
                            id,
                          },
                        })
                      }
                    />
                  )}
                </Mutation>
              )}
            </React.Fragment>
          )
        }}
      </PageQueryHandler>
    )
  }

  // Form submit function
  private handleCompleted(data: { updateCategory: Category }): void {
    const { history, rootPath, createNotificationBanner } = this.props
    const {
      updateCategory: { title },
    } = data

    // Inform user about success
    createNotificationBanner({
      type: 'success',
      message: `Kategorie ${title} erfolgreich bearbeitet`,
    })

    // Go to the categories overview
    history.push(rootPath)
  }

  // Form error function
  private handleError(error: ApolloError): void {
    const { createNotificationBanner } = this.props
    createNotificationBanner({
      type: 'error',
      message: 'Bearbeitung der Kategorie fehlgeschlagen',
    })
    logError(error)
  }
}

export default withRouter(CategoryEdit)
