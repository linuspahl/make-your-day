// libraries
import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
// utils
import { extractIdFromUrl } from 'utils/utils'
// components
import FadeTransition from 'shared/FadeTransition/FadeTransition'
import H1 from 'shared/H1/H1'
import QueryStateHandler from 'shared/QueryStateHandler/QueryStateHandler'
import EvaluationChart from 'components/EvaluationChart/EvaluationChart'
// graphql
import { GetEvaluation } from 'store/evaluation/query'
import { Evaluation } from 'store/evaluation/type'

interface Props extends RouteComponentProps {
  rootPath: string
}

const EvaluationResult = (props: Props): JSX.Element => {
  const { match } = props
  const evaluationId = extractIdFromUrl(match)

  return (
    <FadeTransition fullWidth>
      <H1 context="page">Ergebnis Auswertung</H1>

      <QueryStateHandler
        errorMessage="Auswertung konnte nicht geladen werden"
        query={GetEvaluation}
        queryName="getEvaluation"
        variables={{ id: evaluationId }}
      >
        {(evaluation: Evaluation): JSX.Element => {
          return <EvaluationChart evaluation={evaluation} />
        }}
      </QueryStateHandler>
    </FadeTransition>
  )
}

export default withRouter(EvaluationResult)
