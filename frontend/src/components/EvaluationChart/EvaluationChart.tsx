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
import {
  EvaluationFull,
  EvaluationResult,
  Evaluation,
} from 'store/evaluation/type'

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

const getPeriodTitle = (period: Evaluation['period']): string => {
  const periodOption = evaluationPeriodOptions.find(
    (option): boolean => option.value == period
  )
  return periodOption ? periodOption.title : ''
}

const getDescriptionComponent = (
  categoryUnit: string,
  periodTitle: string
): JSX.Element => {
  return (
    <Description>{`${periodTitle} (${
      categoryUnit ? categoryUnit : 'Anzahl'
    })`}</Description>
  )
}
interface Props {
  evaluation: EvaluationFull
}

const EvaluationChart = (props: Props): JSX.Element => {
  const { evaluation } = props
  const {
    type,
    period,
    result: { labels, series },
  } = evaluation

  // get series colors, to create required css classes
  const seriesColors = getSeriesColors(series, type)

  if (type === 'barchart' || type === 'linechart' || type === 'piechart') {
    const xAxisLabels = formatLabels(labels)
    const periodTitle = getPeriodTitle(period)
    const description = getDescriptionComponent(
      evaluation.category.unit,
      periodTitle
    )
    const chartLegend = <EvaluationChartLegend evaluation={evaluation} />
    return (
      <Wrapper seriesColors={seriesColors}>
        {type === 'barchart' && (
          <Barchart
            chartLegend={chartLegend}
            description={description}
            series={series}
            xAxisLabels={xAxisLabels}
          />
        )}

        {type === 'linechart' && (
          <Linechart
            chartLegend={chartLegend}
            description={description}
            series={series}
            xAxisLabels={xAxisLabels}
          />
        )}

        {type === 'piechart' && (
          <Piechart
            description={description}
            series={series}
            chartLegend={chartLegend}
          />
        )}
      </Wrapper>
    )
  }

  return <span>{`Chart "${type}" kann nicht dargestellt werden`}</span>
}

export default EvaluationChart
