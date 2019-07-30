// interfaces
import {
  EvaluationFull,
  EvaluationCreate,
  EvaluationForList,
  EvaluationResult,
} from 'store/evaluation/type'
import {
  GetEvaluationsForList,
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

export const evaluation: EvaluationFull = {
  ...evaluationCreate,
  category,
  id: 1,
  result: {
    series: [
      {
        data: [{ value: 1 }, { value: 2 }],
        color: 'red',
      },
    ],
    labels: ['Mo', 'Di'],
  },
}

export const evaluationForList: EvaluationForList = {
  title: evaluation.title,
  id: evaluation.id,
}

export const chart: EvaluationResult = {
  labels: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
  series: [
    {
      data: [
        { value: 50 },
        { value: 40 },
        { value: 16 },
        { value: 0 },
        { value: 2 },
        { value: 30 },
        { value: 5 },
      ],
      color: 'red',
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
          series: [
            {
              data: [{ value: 1 }, { value: 2 }],
              color: 'red',
            },
          ],
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

// ## getEvaluationsForList
const getEvaluationsForListRequest = {
  request: {
    query: GetEvaluationsForList,
  },
}
export const getEvaluationsForListSuccess = {
  ...getEvaluationsForListRequest,
  result: {
    data: {
      getEvaluations: [evaluationForList],
    },
  },
}
export const getEvaluationsForListError = {
  ...getEvaluationsForListRequest,
  error: new Error('getEvaluationsForList failed'),
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
