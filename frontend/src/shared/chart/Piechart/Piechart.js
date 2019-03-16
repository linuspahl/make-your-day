// libraries
import React from 'react'
import { Pie } from 'react-chartjs-2'

const Piechart = props => (
  <Pie
    data={{
      labels: props.labels,
      datasets: props.datasets,
    }}
  />
)

export default Piechart
