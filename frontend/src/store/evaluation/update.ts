// libraries
import { DataProxy } from 'apollo-cache'
import { FetchResult } from 'react-apollo'
// graphql
import { GetEvaluationsForList } from 'store/evaluation/query'
import { EvaluationEdit } from 'store/evaluation/type'

export const addEvaluation = (cache: DataProxy, result: FetchResult): void => {
  const {
    data: { createEvaluation },
  } = result
  // Only add a new entry to the store, when there are already entries defined.
  // Otherwise the overview list will not get fetched
  try {
    const evaluations: {
      getEvaluations: EvaluationEdit[]
    } = cache.readQuery({ query: GetEvaluationsForList })

    cache.writeQuery({
      query: GetEvaluationsForList,
      data: {
        getEvaluations: [...evaluations.getEvaluations, createEvaluation],
      },
    })
  } catch {}
}

export const deleteEvaluation = (
  cache: DataProxy,
  result: FetchResult,
  variables: { id: string }
): void => {
  const {
    data: { deleteEvaluation },
  } = result

  try {
    if (deleteEvaluation) {
      const evaluationsQuery: {
        getEvaluations: EvaluationEdit[]
      } = cache.readQuery({ query: GetEvaluationsForList })

      const updatedEvaluations = evaluationsQuery.getEvaluations.filter(
        (evaluation): boolean => {
          return evaluation.id !== variables.id
        }
      )

      cache.writeQuery({
        query: GetEvaluationsForList,
        data: {
          getEvaluations: [...updatedEvaluations],
        },
      })
    }
  } catch {}
}
