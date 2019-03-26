// libraries
import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Mutation, Query } from 'react-apollo'
import { ApolloError } from 'apollo-boost';
// utils
import { logError } from 'utils/utils'
// components
import EvaluationForm from 'components/EvaluationForm/EvaluationForm'
import FadeTransition from 'shared/FadeTransition/FadeTransition'
import CenteredSpinner from 'shared/CenteredSpinner/CenteredSpinner'
import ErrorMessage from 'shared/ErrorMessage/ErrorMessage'
import H1 from 'shared/H1/H1'
// graphql
import { addEvaluation } from 'store/evaluation/update'
import { CreateEvaluation } from 'store/evaluation/mutation'
import { GetCategoriesWithChildren } from 'store/category/query'
// interfaces
import { Evaluation } from 'store/evaluation/type';
import { NotificationCreate } from 'types/types'

interface Props extends RouteComponentProps {
  createNotificationBanner: (notification: NotificationCreate) => void
  rootPath: string
}

class EvaluationCreate extends React.Component<Props> {
  constructor(props: Props) {
    super(props)

    this.handleCompleted = this.handleCompleted.bind(this)
    this.handleError = this.handleError.bind(this)
  }

  render() {
    const { rootPath } = this.props
    return (
      <FadeTransition fullWidth>
        <H1 context="page">Auswertung erstellen</H1>
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

            return (
              <Mutation
                mutation={CreateEvaluation}
                onCompleted={this.handleCompleted}
                onError={this.handleError}
                update={addEvaluation}
              >
                {createEvaluation => (
                  <EvaluationForm
                    categories={data.getCategories}
                    mode="create"
                    rootPath={rootPath}
                    submitAction={variables => createEvaluation({ variables })}
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
  handleCompleted(data: { createEvaluation: Evaluation}) {
    const { history, rootPath, createNotificationBanner } = this.props
    const {
      createEvaluation: { title },
    } = data

    // Inform user about success
    createNotificationBanner({
      type: 'success',
      message: `Auswertung ${title} erfolgreich erstellt`,
    })

    // Go to the evaluations overview
    history.push(rootPath)
  }

  // Form error function
  handleError(error: ApolloError) {
    const { createNotificationBanner } = this.props
    createNotificationBanner({
      type: 'error',
      message: 'Erstellung der Auswertung fehlgeschlagen',
    })
    logError(error)
  }
}

export default withRouter(EvaluationCreate)