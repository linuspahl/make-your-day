// interfaces
import {
  Chart as ChartType,
  Evaluation,
  EvaluationCreate,
} from 'store/evaluation/type'
import {
  GetEvaluations,
  GetEvaluation,
  GetEvaluationUpdate,
} from 'store/evaluation/query'
import { CreateEvaluation, UpdateEvaluation } from 'store/evaluation/mutation'
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
      getEvaluation: {
        id: evaluation.id,
        title: evaluation.title,
        categoryId: evaluation.categoryId,
        groupSubcategories: evaluation.groupSubcategories,
        type: evaluation.type,
        period: evaluation.period,
        category: {
          title: 'title',
        },
        result: {
          labels: ['w3123'],
          datasets: {
            label: 'label',
            data: [1, 2],
            backgroundColor: 'red',
          },
        },
      },
    },
  },
}

// getEvaluationUpdateSuccess
const getEvaluationUpdateRequest = {
  request: {
    query: GetEvaluationUpdate,
    variables: { id: evaluation.id },
  },
}
export const getEvaluationUpdateSuccess = {
  ...getEvaluationUpdateRequest,
  result: {
    data: {
      getEvaluation: {
        id: evaluation.id,
        title: evaluation.title,
        categoryId: evaluation.categoryId,
        groupSubcategories: evaluation.groupSubcategories,
        type: evaluation.type,
        period: evaluation.period,
      },
    },
  },
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

// ## updateEvaluation
const updateEvaluationRequest = {
  request: {
    query: UpdateEvaluation,
    variables: {
      id: evaluation.id,
      title: 'New Title',
      categoryId: evaluation.categoryId,
      type: evaluation.type,
      period: evaluation.period,
      groupSubcategories: evaluation.groupSubcategories,
    },
  },
}
export const updateEvaluationSuccess = {
  ...updateEvaluationRequest,
  result: {
    data: {
      updateEvaluation: {
        id: evaluation.id,
        title: 'New Title',
        categoryId: evaluation.categoryId,
        type: evaluation.type,
        period: evaluation.period,
        groupSubcategories: evaluation.groupSubcategories,
      },
    },
  },
}
export const updateEvaluationError = {
  ...updateEvaluationRequest,
  error: new Error('updateEvaluation failed'),
}
