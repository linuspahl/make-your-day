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
    const { history, rootPath } = this.props
    // Go to the users overview
    history.push(rootPath)
  }

  render() {
    const { rootPath } = this.props
    return (
      <Fragment>
        <H1 context="page">Kategorie erstellen</H1>
        <Mutation
          mutation={CreateCategory}
          onCompleted={this.onComplete.bind(this)}
          onError={logError}
          update={addCategory}
        >
          {createCategory => (
            <CategoryForm
              mutation={CreateCategory}
              rootPath={rootPath}
              submitAction={variables => createCategory({ variables })}
              mode="create"
            />
          )}
        </Mutation>
      </Fragment>
    )
  }
}

export default withRouter(CategoryCreate)
