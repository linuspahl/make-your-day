// libraries
import * as React from 'react'
import { Bar } from 'react-chartjs-2'
// interfaces
import { Chart } from 'store/evaluation/type'

const Barchart = (props: Chart) => (
  <Bar
    data={{
      labels: props.labels,
      datasets: props.datasets,
    }}
  />
)

export default Barchart
