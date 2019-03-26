// libraries
import * as React from 'react'
// components
import Barchart from 'shared/chart/Barchart/Barchart'
import Linechart from 'shared/chart/Linechart/Linechart'
import Piechart from 'shared/chart/Piechart/Piechart'
// interface
import { Evaluation } from 'store/evaluation/type'

interface Props {
  evaluation: Evaluation
} 

const EvaluationChart = (props: Props) => {
  const { evaluation } = props
  if (evaluation.type === 'barchart') {
    return (
      <Barchart
        labels={evaluation.result.labels}
        datasets={evaluation.result.datasets}
      />
    )
  }

  if (evaluation.type === 'linechart') {
    return (
      <Linechart
        labels={evaluation.result.labels}
        datasets={evaluation.result.datasets}
      />
    )
  }

  if (evaluation.type === 'piechart') {
    return (
      <Piechart
        labels={evaluation.result.labels}
        datasets={evaluation.result.datasets}
      />
    )
  }
}

export default EvaluationChart
