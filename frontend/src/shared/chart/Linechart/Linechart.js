// libraries
import React from 'react'
import { Line } from 'react-chartjs-2'

const Linechart = props => (
  <Line
    data={{
      labels: props.labels,
      datasets: props.datasets,
    }}
  />
)

export default Linechart
