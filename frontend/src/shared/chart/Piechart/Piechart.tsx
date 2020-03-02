// libraries
import React from 'react'
import ChartistGraph from 'react-chartist'
// components
import NoResult from 'shared/NoResult/NoResult'
// interfaces
import { EvaluationResult, ChartSeriesData } from 'store/evaluation/type'

const flattenSeries = (
  series: EvaluationResult['series'] = []
): ChartSeriesData[] => {
  const seriesData = series.map((ser): ChartSeriesData[] => {
    return ser.data.map(
      (category): ChartSeriesData => ({
        value: category.value,
        className: category.color ? `Chart-series-${category.color}` : null,
      })
    )
  })
  return Array.prototype.concat.apply([], seriesData)
}

interface Props {
  chartLegend: JSX.Element
  description: JSX.Element
  series: EvaluationResult['series']
}

const Piechart = (props: Props): JSX.Element => {
  const { series, chartLegend, description } = props

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
          series: flatSeries,
        }}
        type="Pie"
      />
      {description}
    </>
  )
}

export default Piechart
