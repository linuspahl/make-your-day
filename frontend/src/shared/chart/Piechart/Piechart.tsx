// libraries
import * as React from 'react'
import ChartistGraph from 'react-chartist'
// interfaces
import { Chart } from 'store/evaluation/type'

const Piechart = (props: Chart): JSX.Element => (
  <ChartistGraph
    data={{
      labels: props.labels,
      series: props.datasets,
    }}
    type="Pie"
  />
)

export default Piechart
