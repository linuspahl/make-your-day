// libraries
import * as React from 'react'
import { Line } from 'react-chartjs-2'
// interfaces
import { Chart } from 'store/evaluation/type'

const Linechart = (props: Chart): JSX.Element => (
  <Line
    data={{
      labels: props.labels,
      datasets: props.datasets,
    }}
  />
)

export default Linechart
