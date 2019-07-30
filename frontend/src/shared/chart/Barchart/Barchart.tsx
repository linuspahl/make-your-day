// libraries
import * as React from 'react'
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

const Barchart = (props: EvaluationResult): JSX.Element => {
  const { series, labels } = props

  // check if there is really a result
  const flatSeries = flattenSeries(series)
  if (!series || series.length === 0) {
    return <NoResult message="Bisher kein Ergebnis" />
  }

  return (
    <ChartistGraph
      type="Bar"
      data-testid="Barchart"
      data={{
        labels,
        series: flatSeries,
      }}
    />
  )
}

export default Barchart
