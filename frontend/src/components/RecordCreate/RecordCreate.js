// libraries
import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { Mutation, Query } from 'react-apollo'
// utils
import { logError } from 'utils/utils'
// components
import H1 from 'shared/H1/H1'
import RecordForm from 'components/RecordForm/RecordForm'
import CenteredSpinner from 'shared/CenteredSpinner/CenteredSpinner'
import ErrorMessage from 'shared/ErrorMessage/ErrorMessage'
// graphql
import { CreateRecord } from 'store/record/mutation.gql'
import { GetCategory } from 'store/category/query.gql'

class RecordCreate extends React.Component {
  constructor(props) {
    super(props)

    this.handleCompleted = this.handleCompleted.bind(this)
    this.handleError = this.handleError.bind(this)
  }

  render() {
    const {
      match: {
        params: { categoryId },
      },
    } = this.props

    return (
      <Fragment>
        <H1 context="page">Eintrag erstellen</H1>
        <Query query={GetCategory} variables={{ id: parseInt(categoryId, 10) }}>
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
            return (
              <Mutation
                mutation={CreateRecord}
                onCompleted={this.handleCompleted}
                onError={this.handleError}
              >
                {createRecord => (
                  <RecordForm
                    category={category}
                    mode="create"
                    rootPath={'/'}
                    submitAction={variables =>
                      createRecord({
                        variables: { ...variables, categoryId: category.id },
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
  async handleCompleted(data) {
    const { history, rootPath, createNotificationBanner } = this.props
    const {
      createRecord: { title },
    } = data

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
