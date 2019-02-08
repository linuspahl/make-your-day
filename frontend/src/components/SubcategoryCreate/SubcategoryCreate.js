// libraries
import React from 'react'
import { withRouter } from 'react-router-dom'
import { Mutation, Query } from 'react-apollo'
// utils
import { logError, extractIdFromUrl } from 'utils/utils'
// components
import CenteredSpinner from 'shared/CenteredSpinner/CenteredSpinner'
import FadeTransition from 'shared/FadeTransition/FadeTransition'
import H1 from 'shared/H1/H1'
import NoResult from 'shared/NoResult/NoResult'
import SubcategoryForm from 'components/SubcategoryForm/SubcategoryForm'
// graphql
import { addSubcategory } from 'store/category/update'
import { CreateSubcategory } from 'store/category/mutation.gql'
import { GetCategory } from 'store/category/query.gql'

class SubcategoryCreate extends React.Component {
  constructor(props) {
    super(props)

    this.handleCompleted = this.handleCompleted.bind(this)
    this.handleError = this.handleError.bind(this)
  }

  render() {
    const { rootPath, match } = this.props
    const categoryId = extractIdFromUrl(match)
    return (
      <FadeTransition>
        <H1 context="page">Subkategorie erstellen</H1>

        <Query query={GetCategory} variables={{ id: categoryId }}>
          {({ loading, error, data }) => {
            if (loading) return <CenteredSpinner />
            if (error)
              return (
                <ErrorMessage
                  error={error}
                  message="Subkategorie konnten nicht geladen werden"
                />
              )
            if (!data.getCategory === 0) return <NoResult />

            return (
              <Mutation
                mutation={CreateSubcategory}
                onCompleted={this.handleCompleted}
                onError={this.handleError}
                update={(cache, data) =>
                  addSubcategory(cache, data, { id: categoryId })
                }
              >
                {createSubcategory => (
                  <SubcategoryForm
                    mode="create"
                    rootPath={rootPath}
                    submitAction={variables => createSubcategory({ variables })}
                    initialData={{ parentId: data.getCategory.id }}
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
  async handleCompleted(data) {
    const { history, rootPath, createNotificationBanner } = this.props
    const {
      createSubcategory: { title, parentId },
    } = data

    // Inform user about success
    createNotificationBanner({
      type: 'success',
      message: `Subkategorie ${title} erfolgreich erstellt`,
    })

    // Go to the subcategories overview
    history.push(`${rootPath}/${parentId}/subcategories`)
  }

  // Form error function
  handleError(error) {
    const { createNotificationBanner } = this.props
    createNotificationBanner({
      type: 'error',
      message: 'Erstellung der Subkategorie fehlgeschlagen',
    })
    logError(error)
  }
}

export default withRouter(SubcategoryCreate)
