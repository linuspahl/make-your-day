// libraries
import * as React from 'react'
import ChartistGraph from 'react-chartist'
// interfaces
import { Chart } from 'store/evaluation/type'

const Barchart = (props: Chart): JSX.Element => (
  <ChartistGraph
    data={{
      labels: props.labels,
      series: props.datasets,
    }}
    type="Bar"
  />
)

export default Barchart
