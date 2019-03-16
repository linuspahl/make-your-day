// libraries
import React from 'react'
import { withRouter } from 'react-router-dom'
import { Query } from 'react-apollo'
// utils
import { extractIdFromUrl, logError } from 'utils/utils'
// components
import CenteredSpinner from 'shared/CenteredSpinner/CenteredSpinner'
import ErrorMessage from 'shared/ErrorMessage/ErrorMessage'
import FadeTransition from 'shared/FadeTransition/FadeTransition'
import H1 from 'shared/H1/H1'
import NoResult from 'shared/NoResult/NoResult'
import Barchart from 'shared/chart/Barchart/Barchart'
import Linechart from 'shared/chart/Linechart/Linechart'
import Piechart from 'shared/chart/Piechart/Piechart'
// graphql
import { GetEvaluation } from 'store/evaluation/query.gql'

class EvaluationEdit extends React.Component {
  constructor(props) {
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
            if (!data.getEvaluation.id) return <NoResult />
            const evaluation = data.getEvaluation

            if (evaluation.type === 'barchart') {
              return (
                <Barchart
                  labels={evaluation.result.labels}
                  datasets={data.getEvaluation.result.datasets}
                />
              )
            }
            if (evaluation.type === 'linechart') {
              return (
                <Linechart
                  labels={evaluation.result.labels}
                  datasets={data.getEvaluation.result.datasets}
                />
              )
            }
            if (evaluation.type === 'piechart') {
              return (
                <Piechart
                  labels={evaluation.result.labels}
                  datasets={data.getEvaluation.result.datasets}
                />
              )
            }
            return (
              <div>Der Typ {evaluation.type} kann nicht verwendet werden.</div>
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
