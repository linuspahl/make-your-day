// libraries
import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import { ApolloError } from 'apollo-boost'
// utils
import { logError } from 'utils/utils'
// components
import CategoryForm from 'components/CategoryForm/CategoryForm'
import ContentBox from 'shared/ContentBox/ContentBox'
import DefaultPageLayout from 'components/DefaultPageLayout/DefaultPageLayout'
import FadeTransition from 'shared/FadeTransition/FadeTransition'
import H1 from 'shared/H1/H1'
// graphql
import { addCategory } from 'store/category/update'
import { CreateCategory } from 'store/category/mutation'
// interface
import { NotificationCreate } from 'types/types'
import {
  Category,
  CategoryCreate as CategoryCreateType,
} from 'store/category/type'

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

  public render(): JSX.Element {
    const { rootPath } = this.props
    return (
      <FadeTransition fullWidth fullHeight>
        <DefaultPageLayout>
          <ContentBox role="main">
            <H1 context="page">Kategorie erstellen</H1>
            <Mutation
              mutation={CreateCategory}
              onCompleted={this.handleCompleted}
              onError={this.handleError}
              update={addCategory}
            >
              {(
                createCategory: ({
                  variables,
                }: {
                  variables: CategoryCreateType
                }) => void
              ): JSX.Element => (
                <CategoryForm
                  mode="create"
                  rootPath={rootPath}
                  submitAction={(variables: CategoryCreateType): void =>
                    createCategory({ variables })
                  }
                />
              )}
            </Mutation>
          </ContentBox>
        </DefaultPageLayout>
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
