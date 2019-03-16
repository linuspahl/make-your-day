// libraries
import React from 'react'
import { Bar } from 'react-chartjs-2'

const Barchart = props => (
  <Bar
    data={{
      labels: props.labels,
      datasets: props.datasets,
    }}
  />
)

export default Barchart
