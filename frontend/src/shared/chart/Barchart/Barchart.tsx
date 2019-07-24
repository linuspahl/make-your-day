// libraries
import * as React from 'react'
import ChartistGraph from 'react-chartist'
// components
import NoResult from 'shared/NoResult/NoResult'
// interfaces
import { Chart } from 'store/evaluation/type'

const Barchart = (props: Chart): JSX.Element => {
  const { datasets, labels } = props

  // check if there is really a result
  if (
    !datasets ||
    !datasets[0] ||
    !datasets[0].data ||
    datasets[0].data.length === 0
  ) {
    return <NoResult message="Bisher kein Ergebnis" />
  }

  return (
    <ChartistGraph
      data-testid="Barchart"
      data={{
        labels: labels,
        series: [datasets[0].data],
      }}
      type="Bar"
    />
  )
}

export default Barchart
