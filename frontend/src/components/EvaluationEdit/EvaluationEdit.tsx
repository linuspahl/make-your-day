// libraries
import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { ApolloError } from 'apollo-boost'
import { Query, Mutation } from 'react-apollo'
// utils
import { extractIdFromUrl, logError } from 'utils/utils'
// components
import EvaluationForm from 'components/EvaluationForm/EvaluationForm'
import CenteredSpinner from 'shared/CenteredSpinner/CenteredSpinner'
import ErrorMessage from 'shared/ErrorMessage/ErrorMessage'
import FadeTransition from 'shared/FadeTransition/FadeTransition'
import H1 from 'shared/H1/H1'
import NoResult from 'shared/NoResult/NoResult'
// graphql
import { UpdateEvaluation } from 'store/evaluation/mutation'
import { GetEvaluation } from 'store/evaluation/query'
import { GetCategoriesWithChildren } from 'store/category/query'
// interfaces
import { NotificationCreate } from 'types/types'
import { Evaluation, EvaluationCreate } from 'store/evaluation/type';

interface Props extends RouteComponentProps {
  createNotificationBanner: (notification: NotificationCreate) => void
  rootPath: string
}

class EvaluationEdit extends React.Component<Props> {
  constructor(props: Props) {
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
                          submitAction={(variables: EvaluationCreate) => updateUser({ variables })}
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
  handleCompleted(data: { updateEvaluation: Evaluation } ) {
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
  handleError(error: ApolloError) {
    const { createNotificationBanner } = this.props
    createNotificationBanner({
      type: 'error',
      message: 'Bearbeitung der Auswertung fehlgeschlagen',
    })
    logError(error)
  }
}

export default withRouter(EvaluationEdit)