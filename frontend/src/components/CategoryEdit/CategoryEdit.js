// libraries
import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { Query, Mutation } from 'react-apollo'
// utils
import { extractIdFromUrl, logError } from 'utils/utils'
// components
import H1 from 'shared/H1/H1'
import CategoryForm from 'components/CategoryForm/CategoryForm'
import CenteredSpinner from 'shared/CenteredSpinner/CenteredSpinner'
import ErrorMessage from 'shared/ErrorMessage/ErrorMessage'
import NoResult from 'shared/NoResult/NoResult'
// graphql
import { UpdateCategory } from 'store/category/mutation.gql'
import { GetCategory } from 'store/category/query.gql'

class CategoryEdit extends React.Component {
  constructor(props) {
    super(props)

    this.handleCompleted = this.handleCompleted.bind(this)
    this.handleError = this.handleError.bind(this)
  }

  render() {
    const { match, rootPath } = this.props
    const categoryId = extractIdFromUrl(match)

    return (
      <Fragment>
        <H1 context="page">Kategorie bearbeiten</H1>

        <Query query={GetCategory} variables={{ id: categoryId }}>
          {({ loading, error, data }) => {
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

  // Form submit function
  handleCompleted(data) {
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
  async handleError(error) {
    const { createNotificationBanner } = this.props
    createNotificationBanner({
      type: 'error',
      message: 'Bearbeitung der Kategorie fehlgeschlagen',
    })
    logError(error)
  }
}

export default withRouter(CategoryEdit)
