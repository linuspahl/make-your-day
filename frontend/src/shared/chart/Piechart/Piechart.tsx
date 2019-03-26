// libraries
import * as React from 'react'
import { Pie } from 'react-chartjs-2'
// interfaces
import { Chart } from 'store/evaluation/type'

const Piechart = (props: Chart) => (
  <Pie
    data={{
      labels: props.labels,
      datasets: props.datasets,
    }}
  />
)

export default Piechart
