// libraries
import * as React from 'react'
import dayjs from 'dayjs'
// components
import Barchart from 'shared/chart/Barchart/Barchart'
import Linechart from 'shared/chart/Linechart/Linechart'
import Piechart from 'shared/chart/Piechart/Piechart'
// interface
import { EvaluationFull } from 'store/evaluation/type'

const formatLabels = (labels: string[] = []): string[] => {
  return labels.map((label): string =>
    dayjs(label, 'YYYY-MM-DD').format('dd DD.')
  )
}

interface Props {
  evaluation: EvaluationFull
}

const EvaluationChart = (props: Props): JSX.Element => {
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

  return <span>Austerungstyp ist nicht definiert</span>
}

export default EvaluationChart
