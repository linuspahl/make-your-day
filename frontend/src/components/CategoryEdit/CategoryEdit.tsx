// libraries
import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Query, Mutation } from 'react-apollo'
import { ApolloError } from 'apollo-boost'
// utils
import { extractIdFromUrl, logError } from 'utils/utils'
// components
import CategoryForm from 'components/CategoryForm/CategoryForm'
import CenteredSpinner from 'shared/CenteredSpinner/CenteredSpinner'
import ErrorMessage from 'shared/ErrorMessage/ErrorMessage'
import FadeTransition from 'shared/FadeTransition/FadeTransition'
import H1 from 'shared/H1/H1'
import NoResult from 'shared/NoResult/NoResult'
// graphql
import { UpdateCategory } from 'store/category/mutation'
import { GetCategory } from 'store/category/query'
// interfaces
import { CategoryCreate, Category } from 'store/category/type'
import { NotificationCreate } from 'types/types'

interface Props extends RouteComponentProps {
  createNotificationBanner: (notification: NotificationCreate) => void
  rootPath: string
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
      <FadeTransition fullWidth>
        <H1 context="page">Kategorie bearbeiten</H1>

        <Query query={GetCategory} variables={{ id: categoryId }}>
          {({
            loading,
            error,
            data,
          }: {
            loading: boolean
            data: { getCategory: Category }
            error?: ApolloError
          }): JSX.Element => {
            if (loading) return <CenteredSpinner />
            if (error)
              return (
                <ErrorMessage
                  error={error}
                  message="Kategorie konnte nicht geladen werden"
                />
              )
            if (!data.getCategory.id) return <NoResult />
            return (
              <Mutation
                mutation={UpdateCategory}
                onCompleted={this.handleCompleted}
                onError={this.handleError}
              >
                {(
                  updateCategory: ({
                    variables,
                  }: {
                    variables: CategoryCreate
                  }) => void
                ): JSX.Element => (
                  <CategoryForm
                    initialData={data.getCategory}
                    rootPath={rootPath}
                    submitAction={(variables: CategoryCreate): void =>
                      updateCategory({ variables })
                    }
                  />
                )}
              </Mutation>
            )
          }}
        </Query>
      </FadeTransition>
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
