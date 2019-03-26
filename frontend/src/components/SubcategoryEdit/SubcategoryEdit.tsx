// libraries
import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Query, Mutation } from 'react-apollo'
import { ApolloError } from 'apollo-boost';
// utils
import { extractIdFromUrl, logError } from 'utils/utils'
// components
import CenteredSpinner from 'shared/CenteredSpinner/CenteredSpinner'
import ErrorMessage from 'shared/ErrorMessage/ErrorMessage'
import FadeTransition from 'shared/FadeTransition/FadeTransition'
import H1 from 'shared/H1/H1'
import NoResult from 'shared/NoResult/NoResult'
import SubcategoryForm from 'components/SubcategoryForm/SubcategoryForm'
// graphql
import { UpdateSubcategory } from 'store/category/mutation'
import { GetCategory } from 'store/category/query'
// interface
import { NotificationCreate } from 'types/types'
import { Category } from 'store/category/type';

interface Props extends RouteComponentProps {
  createNotificationBanner: (notification: NotificationCreate) => void
  rootPath: string
}

class SubcategoryEdit extends React.Component<Props> {
  constructor(props: Props) {
    super(props)

    this.handleCompleted = this.handleCompleted.bind(this)
    this.handleError = this.handleError.bind(this)
  }

  render() {
    const { match, rootPath } = this.props
    const categoryId = extractIdFromUrl(match)

    return (
      <FadeTransition>
        <H1 context="page">Subkategorie bearbeiten</H1>

        <Query query={GetCategory} variables={{ id: categoryId }}>
          {({ loading, error, data }) => {
            if (loading) return <CenteredSpinner />
            if (error)
              return (
                <ErrorMessage
                  error={error}
                  message="Subkategorie konnte nicht geladen werden"
                />
              )
            if (!data.getCategory.id) return <NoResult />
            return (
              <Mutation
                mutation={UpdateSubcategory}
                onCompleted={this.handleCompleted}
                onError={this.handleError}
              >
                {updateCategory => (
                  <SubcategoryForm
                    initialData={data.getCategory}
                    rootPath={rootPath}
                    parentCategory={data.getCategory}
                    submitAction={variables =>
                      updateCategory({
                        variables: { id: data.getCategory.id, ...variables },
                      })
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
  handleCompleted(data: { updateCategory: Category}) {
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
  handleError(error: ApolloError) {
    const { createNotificationBanner } = this.props
    createNotificationBanner({
      type: 'error',
      message: 'Bearbeitung der Subkategorie fehlgeschlagen',
    })
    logError(error)
  }
}

export default withRouter(SubcategoryEdit)
