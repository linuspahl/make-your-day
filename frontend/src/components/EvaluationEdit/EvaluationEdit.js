// libraries
import React from 'react'
import { withRouter } from 'react-router-dom'
import { Query, Mutation } from 'react-apollo'
// utils
import { extractIdFromUrl, logError } from 'utils/utils'
// components
import EvaluationForm from 'components/EvaluationForm/EvaluationForm'
import CenteredSpinner from 'shared/CenteredSpinner/CenteredSpinner'
import ErrorMessage from 'shared/ErrorMessage/ErrorMessage'
import FadeTransition from 'shared/FadeTransition/FadeTransition'
import H1 from 'shared/H1/H1.tsx'
import NoResult from 'shared/NoResult/NoResult'
// graphql
import { UpdateEvaluation } from 'store/evaluation/mutation.gql'
import { GetEvaluation } from 'store/evaluation/query.gql'
import { GetCategoriesWithChildren } from 'store/category/query.gql'

class EvaluationEdit extends React.Component {
  constructor(props) {
    super(props)

    this.handleCompleted = this.handleCompleted.bind(this)
    this.handleError = this.handleError.bind(this)
  }

  render() {
    const { match, rootPath } = this.props
    const evaluationId = extractIdFromUrl(match)

    return (
      <FadeTransition fullWidth>
        <H1 context="page">Auswertung bearbeiten</H1>

        <Query query={GetCategoriesWithChildren}>
          {({ loading, error, data }) => {
            if (loading) return <CenteredSpinner />
            if (error)
              return (
                <ErrorMessage
                  error={error}
                  message="Kategorien konnten nicht geladen werden"
                />
              )
            const categories = data.getCategories

            return (
              <Query query={GetEvaluation} variables={{ id: evaluationId }}>
                {({ loading, error, data }) => {
                  if (loading) return <CenteredSpinner />
                  if (error)
                    return (
                      <ErrorMessage
                        error={error}
                        message="Auswertung konnte nicht geladen werden"
                      />
                    )
                  if (!data.getEvaluation.id) return <NoResult />
                  return (
                    <Mutation
                      mutation={UpdateEvaluation}
                      onCompleted={this.handleCompleted}
                      onError={this.handleError}
                    >
                      {updateUser => (
                        <EvaluationForm
                          categories={categories}
                          initialData={data.getEvaluation}
                          rootPath={rootPath}
                          submitAction={variables => updateUser({ variables })}
                        />
                      )}
                    </Mutation>
                  )
                }}
              </Query>
            )
          }}
        </Query>
      </FadeTransition>
    )
  }

  // Form submit function
  handleCompleted(data) {
    const { history, rootPath, createNotificationBanner } = this.props
    const {
      updateEvaluation: { title },
    } = data

    // Inform user about success
    createNotificationBanner({
      type: 'success',
      message: `Auswertung ${title} erfolgreich bearbeitet`,
    })

    // Go to the evaluations overview
    history.push(rootPath)
  }

  // Form error function
  async handleError(error) {
    const { createNotificationBanner } = this.props
    createNotificationBanner({
      type: 'error',
      message: 'Bearbeitung der Auswertung fehlgeschlagen',
    })
    logError(error)
  }
}

export default withRouter(EvaluationEdit)
