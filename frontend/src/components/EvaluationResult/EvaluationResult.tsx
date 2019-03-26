// libraries
import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Query } from 'react-apollo'
// utils
import { extractIdFromUrl, logError } from 'utils/utils'
// components
import CenteredSpinner from 'shared/CenteredSpinner/CenteredSpinner'
import ErrorMessage from 'shared/ErrorMessage/ErrorMessage'
import FadeTransition from 'shared/FadeTransition/FadeTransition'
import H1 from 'shared/H1/H1'
import NoResult from 'shared/NoResult/NoResult'
import EvaluationChart from 'components/EvaluationChart/EvaluationChart'
// graphql
import { GetEvaluation } from 'store/evaluation/query'
import { Evaluation } from 'store/evaluation/type';
import { NotificationCreate } from 'types/types';
import { ApolloError } from 'apollo-boost';

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
    const { match } = this.props
    const evaluationId = extractIdFromUrl(match)

    return (
      <FadeTransition fullWidth>
        <H1 context="page">Ergebnis Auswertung</H1>

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
            const evaluation = data.getEvaluation
            if (!evaluation.id) return <NoResult />
            return <EvaluationChart evaluation={evaluation} />
          }}
        </Query>
      </FadeTransition>
    )
  }

  // Form submit function
  handleCompleted(data: { updateEvaluation: Evaluation }) {
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
