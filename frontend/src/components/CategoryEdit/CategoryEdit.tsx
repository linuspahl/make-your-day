// libraries
import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import { ApolloError } from 'apollo-boost'
// utils
import { extractIdFromUrl, logError } from 'utils/utils'
// components
import CategoryForm from 'components/CategoryForm/CategoryForm'
import FadeTransition from 'shared/FadeTransition/FadeTransition'
import ContentBox from 'shared/ContentBox/ContentBox';
import H1 from 'shared/H1/H1'
// graphql
import { UpdateCategory } from 'store/category/mutation'
import { GetCategory } from 'store/category/query'
// interfaces
import { CategoryCreate, Category } from 'store/category/type'
import { NotificationCreate } from 'types/types'
import QueryStateHandler from 'shared/QueryStateHandler/QueryStateHandler'

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
      <QueryStateHandler
        errorMessage="Kategorie konnte nicht geladen werden"
        query={GetCategory}
        queryName="getCategory"
        variables={{ id: categoryId }}
      >
        {(category: Category): JSX.Element => (
          <FadeTransition fullWidth>
            <ContentBox role="main">
              <H1 context="page">Kategorie bearbeiten</H1>
            
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
                    initialData={category}
                    rootPath={rootPath}
                    submitAction={(variables: CategoryCreate): void =>
                      updateCategory({ variables })
                    }
                  />
                )}
              </Mutation>
            </ContentBox>
          </FadeTransition>
        )}
      </QueryStateHandler>
      
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
