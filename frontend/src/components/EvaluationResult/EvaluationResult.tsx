// libraries
import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
// utils
import { extractIdFromUrl } from 'utils/utils'
// components
import EvaluationChart from 'components/EvaluationChart/EvaluationChart'
import H1 from 'shared/H1/H1'
import PageQueryHandler from 'shared/PageQueryHandler/PageQueryHandler'
// graphql
import { GetEvaluation } from 'store/evaluation/query'
import { Evaluation } from 'store/evaluation/type'

interface Props extends RouteComponentProps {
  rootPath: string
}

const EvaluationResult = ({ match }: Props): JSX.Element => {
  const evaluationId = extractIdFromUrl(match)
  return (
    <PageQueryHandler
      dataTestId="EvaluationResult"
      errorMessages={{
        getEvaluation: 'Auswertung konnte nicht geladen werden',
      }}
      query={GetEvaluation}
      variables={{ id: evaluationId }}
      queryNames={['getEvaluations']}
    >
      {({
        data: { getEvaluation: evaluation },
        status: { getEvaluation: evaluationQueryStatus },
      }: {
        data: { getEvaluation?: Evaluation }
        status: { getEvaluation: JSX.Element }
      }): JSX.Element => (
        <>
          <H1 context="page">Ergebnis Auswertung</H1>
          {evaluationQueryStatus}
          {!evaluationQueryStatus && evaluation && (
            <EvaluationChart evaluation={evaluation} />
          )}
        </>
      )}
    </PageQueryHandler>
  )
}

export default withRouter(EvaluationResult)
