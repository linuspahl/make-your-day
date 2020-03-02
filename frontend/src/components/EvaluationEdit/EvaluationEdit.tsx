// libraries
import React, { useContext } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { ApolloError, gql } from 'apollo-boost'
import { Mutation } from 'react-apollo'
// utils
import { extractIdFromUrl, logError } from 'utils/utils'
// components
import EvaluationForm from 'components/EvaluationForm/EvaluationForm'
import H1 from 'shared/H1/H1'
import PageQueryHandler from 'shared/PageQueryHandler/PageQueryHandler'
// contexts
import AppContext from 'contexts/AppContext'
// graphql
import { UpdateEvaluation } from 'store/evaluation/mutation'
// interfaces
import { NotificationCreate } from 'types/types'
import { EvaluationEdit as EvaluationEditType } from 'store/evaluation/type'
import { CategoryForListWithChildren } from 'store/category/type'

export const pageQuery = gql`
  query($evaluationId: ID!) {
    getEvaluation(id: $evaluationId) {
      id
      title
      categoryId
      groupSubcategories
      type
      period
    }
    # same as GetCategoriesForListWithChildren query
    getCategories {
      id
      title
      hasSubcategories
      subcategories {
        id
        title
      }
    }
  }
`

interface Props extends RouteComponentProps {
  rootPath: string
}

interface PageQueryResult {
  data: {
    getCategories: CategoryForListWithChildren[]
    getEvaluation: EvaluationEditType
  }
  status?: { getCategories: JSX.Element; getEvaluation: JSX.Element }
}

// Form submit function
const handleCompleted = (
  props: Props,
  createNotificationBanner: (notification: NotificationCreate) => void
): ((data: { updateEvaluation: EvaluationEditType }) => void) => {
  const { history, rootPath } = props
  return (data): void => {
    const {
      updateEvaluation: { title },
    } = data

    // Inform user about success
    createNotificationBanner({
      type: 'success',
      message: `Auswertung ${title} erfolgreich bearbeitet`,
    })

    // Go to the categories overview
    history.push(rootPath)
  }
}

// Form error function
const handleError = (
  createNotificationBanner: (notification: NotificationCreate) => void
): ((error: ApolloError) => void) => {
  return (error): void => {
    createNotificationBanner({
      type: 'error',
      message: 'Bearbeitung der Auswertung fehlgeschlagen',
    })
    logError(error)
  }
}

const EvaluationEdit = (props: Props): JSX.Element => {
  const { match, rootPath } = props
  const { createNotificationBanner } = useContext(AppContext)
  const onCompleted = handleCompleted(props, createNotificationBanner)
  const onError = handleError(createNotificationBanner)
  const evaluationId = extractIdFromUrl(match)
  return (
    <PageQueryHandler
      dataTestId="EvaluationEdit"
      query={pageQuery}
      variables={{ evaluationId }}
      queryNames={['getCategories', 'getEvaluation']}
      errorMessages={{
        getCategories: 'Kategorien konnten nicht geladen werden',
        getEvaluation: 'Auswertung konnten nicht geladen werden',
      }}
    >
      {({
        data: { getCategories: categories, getEvaluation: evaluation },
        status: { getEvaluation: evaluationQueryStatus },
      }: PageQueryResult): JSX.Element => (
        <>
          <H1 context="page">Auswertung bearbeiten</H1>
          {evaluationQueryStatus}
          {!evaluationQueryStatus && evaluation && (
            <Mutation
              mutation={UpdateEvaluation}
              onCompleted={onCompleted}
              onError={onError}
            >
              {(
                updateEvaluation: ({
                  variables,
                }: {
                  variables: EvaluationEditType
                }) => void
              ): JSX.Element => (
                <EvaluationForm
                  categories={categories}
                  initialData={evaluation}
                  rootPath={rootPath}
                  submitAction={(variables: EvaluationEditType): void => {
                    updateEvaluation({ variables })
                  }}
                />
              )}
            </Mutation>
          )}
        </>
      )}
    </PageQueryHandler>
  )
}

export default withRouter(EvaluationEdit)
