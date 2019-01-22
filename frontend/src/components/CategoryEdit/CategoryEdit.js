// libraries
import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'
// utils
import { extractIdFromUrl, logError } from 'utils/utils'
// components
import H1 from 'shared/H1/H1'
import CategoryForm from 'components/CategoryForm/CategoryForm'
import CenteredSpinner from 'shared/CenteredSpinner/CenteredSpinner'
// graphql
import { Query, Mutation } from 'react-apollo'
import { UpdateCategory } from 'store/category/mutation.gql'
import { GetCategory } from 'store/category/query.gql'

class CategoryEdit extends React.Component {
  // Form submit function
  async onComplete(data) {
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
  onError(error) {
    const { createNotificationBanner } = this.props
    createNotificationBanner({
      type: 'error',
      message: 'Bearbeitung der Kategorie fehlgeschlagen',
    })
    logError(error)
  }

  render() {
    const { match, rootPath } = this.props
    const categoryId = extractIdFromUrl(match)

    return (
      <Fragment>
        <H1 context="page">Kategorie bearbeiten</H1>
        <Query variables={{ id: categoryId }} query={GetCategory}>
          {({ loading, error, data }) => {
            if (loading) return <CenteredSpinner />
            if (error) return `Error! ${error.message}`

            return (
              <Mutation
                mutation={UpdateCategory}
                onCompleted={this.onComplete.bind(this)}
                onError={this.onError.bind(this)}
              >
                {updateUser => (
                  <CategoryForm
                    initialData={data.getCategory}
                    rootPath={rootPath}
                    submitAction={variables => updateUser({ variables })}
                  />
                )}
              </Mutation>
            )
          }}
        </Query>
      </Fragment>
    )
  }
}

export default withRouter(CategoryEdit)
