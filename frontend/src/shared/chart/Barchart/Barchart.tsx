// libraries
import React from 'react'
import ChartistGraph from 'react-chartist'
// components
import NoResult from 'shared/NoResult/NoResult'
// interfaces
import { EvaluationResult, ChartSeriesData } from 'store/evaluation/type'

const flattenSeries = (
  series: EvaluationResult['series'] = []
): ChartSeriesData[][] => {
  let result: ChartSeriesData[][] = []
  series.forEach((ser): void => {
    result = [
      ...result,
      [
        ...ser.data.map(
          (category): ChartSeriesData => ({
            value: category.value,
            className: ser.color ? `Chart-series-${ser.color}` : null,
          })
        ),
      ],
    ]
  })
  return result
}
interface Props {
  chartLegend: JSX.Element
  description: JSX.Element
  series: EvaluationResult['series']
  xAxisLabels: string[]
}

const Barchart = (props: Props): JSX.Element => {
  const { series, description, chartLegend, xAxisLabels } = props

  // check if there is really a result
  const flatSeries = flattenSeries(series)
  if (!flatSeries || flatSeries.length === 0) {
    return <NoResult message="Bisher kein Ergebnis" />
  }

  return (
    <>
      {chartLegend}
      <ChartistGraph
        data={{
          labels: xAxisLabels,
          series: flatSeries,
        }}
        type="Bar"
      />
      {description}
    </>
  )
}

export default Barchart
