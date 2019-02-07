// libraries
import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { Mutation, Query } from 'react-apollo'
// utils
import { extractIdFromUrl, logError } from 'utils/utils'
// components
import H1 from 'shared/H1/H1'
import RecordForm from 'components/RecordForm/RecordForm'
import CenteredSpinner from 'shared/CenteredSpinner/CenteredSpinner'
import ErrorMessage from 'shared/ErrorMessage/ErrorMessage'
// graphql
import { CreateRecord } from 'store/record/mutation.gql'
import { GetCategoryWithChildren } from 'store/category/query.gql'
import { addRecord } from 'store/record/update'

class RecordCreate extends React.Component {
  constructor(props) {
    super(props)

    this.handleCompleted = this.handleCompleted.bind(this)
    this.handleError = this.handleError.bind(this)
  }

  render() {
    const {
      history: {
        location: { search },
      },
      match,
    } = this.props
    const urlParams = new URLSearchParams(search)
    const categoryId = extractIdFromUrl(match, 'categoryId')

    return (
      <Fragment>
        <H1 context="page">Eintrag erstellen</H1>
        <Query
          query={GetCategoryWithChildren}
          variables={{ id: parseInt(categoryId, 10) }}
        >
          {({ loading, error, data }) => {
            if (loading) return <CenteredSpinner />
            if (error)
              return (
                <ErrorMessage
                  error={error}
                  message="Kategorie konnte nicht geladen werden"
                />
              )
            const category = data.getCategory
            if (!category) return <NoResult />

            // If the category has some subcategories, make the first one the
            // default selection
            const initialData = {
              categoryId: category.id,
              createdAt: urlParams.get('createdAt'),
            }
            if (category.subcategories && category.subcategories.length !== 0) {
              initialData.categoryId = category.subcategories[0].id
            }

            return (
              <Mutation
                mutation={CreateRecord}
                onCompleted={this.handleCompleted}
                onError={this.handleError}
                update={addRecord}
              >
                {createRecord => (
                  <RecordForm
                    category={category}
                    mode="create"
                    rootPath={'/'}
                    initialData={initialData}
                    submitAction={variables => createRecord({ variables })}
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
  async handleCompleted(data) {
    const { history, createNotificationBanner } = this.props

    // Inform user about success
    createNotificationBanner({
      type: 'success',
      message: `Eintrag erfolgreich erstellt`,
    })

    // Go to the dashboard
    history.push('/')
  }

  // Form error function
  handleError(error) {
    const { createNotificationBanner } = this.props
    createNotificationBanner({
      type: 'error',
      message: 'Erstellung des Eintrags fehlgeschlagen',
    })
    logError(error)
  }
}

export default withRouter(RecordCreate)
