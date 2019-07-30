// libraries
import * as React from 'react'
import ChartistGraph from 'react-chartist'
// components
import NoResult from 'shared/NoResult/NoResult'
// interfaces
import { EvaluationResult, ChartSeries } from 'store/evaluation/type'

const Linechart = (props: EvaluationResult): JSX.Element => {
  const { series, labels } = props

  // check if there is really a result
  if (!series || series.length === 0) {
    return <NoResult message="Bisher kein Ergebnis" />
  }

  return (
    <ChartistGraph
      data={{
        labels,
        series: series.map(
          (ser): ChartSeries => ({
            ...ser,
            className: ser.color ? `Chart-series-${ser.color}` : null,
          })
        ),
      }}
      type="Line"
    />
  )
}

export default Linechart
