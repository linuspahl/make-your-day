// libraries
import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { Query, Mutation } from 'react-apollo'
// utils
import { extractIdFromUrl, logError } from 'utils/utils'
// components
import H1 from 'shared/H1/H1'
import SubcategoryForm from 'components/SubcategoryForm/SubcategoryForm'
import CenteredSpinner from 'shared/CenteredSpinner/CenteredSpinner'
import ErrorMessage from 'shared/ErrorMessage/ErrorMessage'
import NoResult from 'shared/NoResult/NoResult'
// graphql
import { UpdateSubcategory } from 'store/category/mutation.gql'
import { GetCategory } from 'store/category/query.gql'

class SubcategoryEdit extends React.Component {
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
      </Fragment>
    )
  }

  // Form submit function
  handleCompleted(data) {
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
  async handleError(error) {
    const { createNotificationBanner } = this.props
    createNotificationBanner({
      type: 'error',
      message: 'Bearbeitung der Subkategorie fehlgeschlagen',
    })
    logError(error)
  }
}

export default withRouter(SubcategoryEdit)
