// interfaces
import {
  Chart as ChartType,
  Evaluation,
  EvaluationCreate,
} from 'store/evaluation/type'
import { GetEvaluations, GetEvaluation } from 'store/evaluation/query'
import { CreateEvaluation } from 'store/evaluation/mutation'
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
  category,
  id: 1,
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

// # Api stubs

// ## createEvaluation
const createEvaluationRequest = {
  request: {
    query: CreateEvaluation,
    variables: evaluationCreate,
  },
}
export const createEvaluationSuccess = {
  ...createEvaluationRequest,
  result: {
    data: {
      createEvaluation: evaluation,
    },
  },
}
export const createEvaluationError = {
  ...createEvaluationRequest,
  error: new Error('createEvaluation failed'),
}

// ## getEvaluation
const getEvaluationRequest = {
  request: {
    query: GetEvaluation,
    variables: { id: evaluation.id },
  },
}
export const getEvaluationSuccess = {
  ...getEvaluationRequest,
  result: {
    data: {
      getEvaluation: evaluation,
    },
  },
}

export const getEvaluationError = {
  ...getEvaluationRequest,
  error: new Error('getEvaluation failed'),
}

// ## getEvaluations
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
  error: new Error('getEvaluations failed'),
}
