// interfaces
import {
  Chart as ChartType,
  Evaluation,
  EvaluationCreate,
} from 'store/evaluation/type'
import { GetEvaluations } from 'store/evaluation/query'
// fixtures
import { category } from 'store/category/fixtures'

export const evaluationCreate: EvaluationCreate = {
  title: 'Title',
  categoryId: 1,
  groupSubcategories: false,
  type: 'linechart',
  period: 'day',
}

export const evaluation: Evaluation = {
  ...evaluationCreate,
  id: 1,
  category: category,
  result: {
    datasets: [
      {
        label: '2010-01-01',
        data: [1, 2],
        backgroundColor: 'red',
      },
    ],
    labels: ['Mo', 'Di'],
  },
}

export const chart: ChartType = {
  labels: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
  datasets: [
    {
      label: 'Titel Kategorie',
      data: [50, 40, 16, 0, 2, 30, 5],
      backgroundColor: 'red',
    },
  ],
}

// Api stubs
const getEvaluationsRequest = {
  request: {
    query: GetEvaluations,
  },
}
export const getEvaluationsSuccess = {
  ...getEvaluationsRequest,
  result: {
    data: {
      getEvaluations: [evaluation],
    },
  },
}

export const getEvaluationsError = {
  ...getEvaluationsRequest,
  error: new Error('getWidgets failed'),
}
