// libraries
import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'
// utils
import { logError } from 'utils/utils'
// components
import H1 from 'shared/H1/H1'
import CategoryForm from 'components/CategoryForm/CategoryForm'
// graphql
import { Mutation } from 'react-apollo'
import { addCategory } from 'store/category/update'
import { CreateCategory } from 'store/category/mutation.gql'

class CategoryCreate extends React.Component {
  // Form submit function
  async onComplete(data) {
    const { history, rootPath, createNotificationBanner } = this.props
    const {
      createCategory: { title },
    } = data

    // Inform user about success
    createNotificationBanner({
      type: 'success',
      message: `Kategorie ${title} erfolgreich erstellt`,
    })

    // Go to the categories overview
    history.push(rootPath)
  }

  // Form error function
  onError(error) {
    const { createNotificationBanner } = this.props
    createNotificationBanner({
      type: 'error',
      message: 'Erstellung der Kategorie fehlgeschlagen',
    })
    logError(error)
  }

  render() {
    const { rootPath, createNotificationBanner } = this.props
    return (
      <Fragment>
        <H1 context="page">Kategorie erstellen</H1>
        <Mutation
          mutation={CreateCategory}
          onCompleted={this.onComplete.bind(this)}
          onError={this.onError.bind(this)}
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
}

export default withRouter(CategoryCreate)
