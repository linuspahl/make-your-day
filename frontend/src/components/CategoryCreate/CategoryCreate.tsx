// libraries
import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import { ApolloError } from 'apollo-boost'
// utils
import { logError } from 'utils/utils'
// components
import CategoryForm from 'components/CategoryForm/CategoryForm'
import FadeTransition from 'shared/FadeTransition/FadeTransition'
import H1 from 'shared/H1/H1'
// graphql
import { addCategory } from 'store/category/update'
import { CreateCategory } from 'store/category/mutation'
// interface
import {
  Category,
  CategoryCreate as CategoryCreateType,
} from 'store/category/type'
import { NotificationCreate } from 'types/types'

interface Props extends RouteComponentProps {
  createNotificationBanner: (notification: NotificationCreate) => void
  rootPath: string
}

class CategoryCreate extends React.Component<Props> {
  public constructor(props: Props) {
    super(props)

    this.handleCompleted = this.handleCompleted.bind(this)
    this.handleError = this.handleError.bind(this)
  }

  public render(): React.ReactElement {
    const { rootPath } = this.props
    return (
      <FadeTransition fullWidth>
        <H1 context="page">Kategorie erstellen</H1>
        <Mutation
          mutation={CreateCategory}
          onCompleted={this.handleCompleted}
          onError={this.handleError}
          update={addCategory}
        >
          {createCategory => (
            <CategoryForm
              mode="create"
              rootPath={rootPath}
              submitAction={(variables: CategoryCreateType) =>
                createCategory({ variables })
              }
            />
          )}
        </Mutation>
      </FadeTransition>
    )
  }

  // Form submit function
  private handleCompleted(data: { createCategory: Category }): void {
    const { history, rootPath, createNotificationBanner } = this.props
    const {
      createCategory: { id, title, hasSubcategories },
    } = data

    // Inform user about success
    createNotificationBanner({
      type: 'success',
      message: `Kategorie ${title} erfolgreich erstellt`,
    })

    // Go to the categories overview
    if (hasSubcategories) {
      history.push(`${rootPath}/${id}/subcategories/create`)
    } else {
      history.push(rootPath)
    }
  }

  // Form error function
  private handleError(error: ApolloError): void {
    const { createNotificationBanner } = this.props
    createNotificationBanner({
      type: 'error',
      message: 'Erstellung der Kategorie fehlgeschlagen',
    })
    logError(error)
  }
}

export default withRouter(CategoryCreate)
