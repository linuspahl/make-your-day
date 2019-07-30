// libraries
import * as React from 'react'
import ChartistGraph from 'react-chartist'
// components
import NoResult from 'shared/NoResult/NoResult'
// interfaces
import { EvaluationResult, ChartSeriesData } from 'store/evaluation/type'

const getSeriesData = (
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

const Piechart = (props: EvaluationResult): JSX.Element => {
  const { series, labels } = props

  // check if there is really a result
  if (!series || series.length === 0) {
    return <NoResult message="Bisher kein Ergebnis" />
  }

  return (
    <ChartistGraph
      data={{
        labels,
        series: getSeriesData(series),
      }}
      type="Pie"
    />
  )
}

export default Piechart
