// libraries
import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { Mutation } from 'react-apollo'
// utils
import { logError } from 'utils/utils'
// components
import H1 from 'shared/H1/H1'
import CategoryForm from 'components/CategoryForm/CategoryForm'
// graphql
import { addCategory } from 'store/category/update'
import { CreateCategory } from 'store/category/mutation.gql'

class CategoryCreate extends React.Component {
  constructor(props) {
    super(props)

    this.handleCompleted = this.handleCompleted.bind(this)
    this.handleError = this.handleError.bind(this)
  }

  render() {
    const { rootPath } = this.props
    return (
      <Fragment>
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
              submitAction={variables => createCategory({ variables })}
              initialData={{ type: 'journal' }}
            />
          )}
        </Mutation>
      </Fragment>
    )
  }

  // Form submit function
  async handleCompleted(data) {
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
  handleError(error) {
    const { createNotificationBanner } = this.props
    createNotificationBanner({
      type: 'error',
      message: 'Erstellung der Kategorie fehlgeschlagen',
    })
    logError(error)
  }
}

export default withRouter(CategoryCreate)
