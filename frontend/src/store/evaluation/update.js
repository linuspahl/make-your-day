// graphql
import { GetEvaluations } from 'store/category/query.gql'

export const addEvaluation = (cache, result) => {
  const {
    data: { createEvaluation },
  } = result
  // Only add a new entry to the store, when there are already entries defined.
  // Otherwise the the overview list will not get fetched
  try {
    const Evaluations = cache.readQuery({ query: GetEvaluations })

    cache.writeQuery({
      query: GetEvaluations,
      data: {
        getEvaluations: [...Evaluations.getEvaluations, createEvaluation],
      },
    })
  } catch {}
}

export const deleteEvaluation = (cache, result, variables) => {
  const {
    data: { deleteEvaluation },
  } = result

  try {
    if (deleteEvaluation) {
      const EvaluationsQuery = cache.readQuery({ query: GetEvaluations })
      const updatedEvaluations = EvaluationsQuery.getEvaluations.filter(
        category => {
          return category.id !== variables.id
        }
      )

      cache.writeQuery({
        query: GetEvaluations,
        data: {
          getEvaluations: [...updatedEvaluations],
        },
      })
    }
  } catch {}
}
