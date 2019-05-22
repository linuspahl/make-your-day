// libraries
import * as React from 'react'
import moment = require('moment')
// components
import Barchart from 'shared/chart/Barchart/Barchart'
import Linechart from 'shared/chart/Linechart/Linechart'
import Piechart from 'shared/chart/Piechart/Piechart'
// interface
import { Evaluation } from 'store/evaluation/type'

const formatLabels = (labels: string[] = []): string[] => {
  return labels.map(label => moment(label, 'YYYY-MM-DD').format('dd DD.'))
}

interface Props {
  evaluation: Evaluation
}

const EvaluationChart = (props: Props): React.ReactElement => {
  const {
    evaluation: {
      type,
      result: { labels, datasets },
    },
  } = props
  const formatedLabels = formatLabels(labels)
  if (type === 'barchart') {
    return <Barchart labels={formatedLabels} datasets={datasets} />
  }

  if (type === 'linechart') {
    return <Linechart labels={formatedLabels} datasets={datasets} />
  }

  if (type === 'piechart') {
    return <Piechart labels={labels} datasets={datasets} />
  }
}

export default EvaluationChart
