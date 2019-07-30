// libraries
import * as React from 'react'
import dayjs from 'dayjs'
// utils
import { evaluationPeriodOptions } from 'params'
// components
import { Wrapper, Description } from './styles'
import Barchart from 'shared/chart/Barchart/Barchart'
import Linechart from 'shared/chart/Linechart/Linechart'
import Piechart from 'shared/chart/Piechart/Piechart'
import EvaluationChartLegend from 'components/EvaluationChartLegend/EvaluationChartLegend'
// interface
import { EvaluationFull, EvaluationResult } from 'store/evaluation/type'

const formatLabels = (labels: string[] = []): string[] => {
  return labels.map((label): string => dayjs(label, 'YYYY-MM-DD').format('dd'))
}

// The only way to adjust the color of out chart elements
// is to add custom css classes.
const getSeriesColors = (
  series: EvaluationResult['series'] = [],
  type: EvaluationFull['type']
): string[] => {
  const seriesColorsMix = series.map((ser): string[] => {
    if (type === 'piechart' && ser.data && ser.data.length !== 0) {
      return ser.data.map((category): string => category.color)
    }
    return [ser.color]
  })
  return Array.prototype.concat.apply([], seriesColorsMix)
}

interface Props {
  evaluation: EvaluationFull
}

const EvaluationChart = (props: Props): JSX.Element => {
  const {
    evaluation: {
      category,
      type,
      period,
      result: { labels, series },
    },
  } = props
  const formatedLabels = formatLabels(labels)
  const seriesColors = getSeriesColors(series, type)
  const periodOption = evaluationPeriodOptions.find(
    (option): boolean => option.value == period
  )
  const unit = category.unit || 'Anzahl'

  if (type === 'barchart' || type === 'linechart' || type === 'piechart') {
    return (
      <Wrapper seriesColors={seriesColors}>
        <EvaluationChartLegend evaluation={props.evaluation} />

        {type === 'barchart' && (
          <Barchart labels={formatedLabels} series={series} />
        )}

        {type === 'linechart' && (
          <Linechart labels={formatedLabels} series={series} />
        )}

        {type === 'piechart' && <Piechart labels={labels} series={series} />}

        <Description>{`${periodOption.title} - ${unit}`}</Description>
      </Wrapper>
    )
  }

  return <span>Austerungstyp ist nicht definiert</span>
}

export default EvaluationChart
