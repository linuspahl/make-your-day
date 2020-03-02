// libraries
import React from 'react'
import ChartistGraph from 'react-chartist'
// components
import NoResult from 'shared/NoResult/NoResult'
// interfaces
import { ChartSeries, EvaluationResult } from 'store/evaluation/type'

interface Props {
  chartLegend: JSX.Element
  description: JSX.Element
  series: EvaluationResult['series']
  xAxisLabels: string[]
}

const Linechart = (props: Props): JSX.Element => {
  const { series, description, chartLegend, xAxisLabels } = props

  // check if there is really a result
  if (!series || series.length === 0) {
    return <NoResult message="Bisher kein Ergebnis" />
  }

  return (
    <>
      {chartLegend}
      <ChartistGraph
        data={{
          labels: xAxisLabels,
          series: series.map(
            (ser): ChartSeries => ({
              ...ser,
              className: ser.color ? `Chart-series-${ser.color}` : null,
            })
          ),
        }}
        type="Line"
      />
      {description}
    </>
  )
}

export default Linechart
