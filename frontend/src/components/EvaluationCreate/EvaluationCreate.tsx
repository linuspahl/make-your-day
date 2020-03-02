// libraries
import React, { useContext } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import { ApolloError } from 'apollo-boost'
// utils
import { logError } from 'utils/utils'
// components
import EvaluationForm from 'components/EvaluationForm/EvaluationForm'
import H1 from 'shared/H1/H1'
import PageQueryHandler from 'shared/PageQueryHandler/PageQueryHandler'
// contexts
import AppContext from 'contexts/AppContext'
// graphql
import { addEvaluation } from 'store/evaluation/update'
import { CreateEvaluation } from 'store/evaluation/mutation'
import { GetCategoriesForListWithChildren } from 'store/category/query'
// interfaces
import {
  EvaluationEdit,
  EvaluationCreate as EvaluationCreateType,
} from 'store/evaluation/type'
import { NotificationCreate } from 'types/types'
import { CategoryForListWithChildren } from 'store/category/type'

interface Props extends RouteComponentProps {
  rootPath: string
}

// Form submit function
const handleCompleted = (
  props: Props,
  createNotificationBanner: (notification: NotificationCreate) => void
): ((data: { createEvaluation: EvaluationEdit }) => void) => {
  const { rootPath, history } = props
  return (data): void => {
    const {
      createEvaluation: { title },
    } = data

    // Inform user about success
    createNotificationBanner({
      type: 'success',
      message: `Auswertung ${title} erfolgreich erstellt`,
    })

    // Go to the evaluations overview
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
      message: 'Erstellung der Auswertung fehlgeschlagen',
    })
    logError(error)
  }
}

const EvaluationCreate = (props: Props): JSX.Element => {
  const { rootPath } = props
  const { createNotificationBanner } = useContext(AppContext)
  const onCompleted = handleCompleted(props, createNotificationBanner)
  const onError = handleError(createNotificationBanner)
  return (
    <PageQueryHandler
      dataTestId="EvaluationCreate"
      errorMessages={{
        getCategories: 'Kategorien konnten nicht geladen werden',
      }}
      query={GetCategoriesForListWithChildren}
      queryNames={['getCategories']}
    >
      {({
        data: { getCategories: categories },
      }: {
        data: { getCategories: CategoryForListWithChildren[] }
      }): JSX.Element => (
        <>
          <H1 context="page">Auswertung erstellen</H1>
          <Mutation
            mutation={CreateEvaluation}
            onCompleted={onCompleted}
            onError={onError}
            update={addEvaluation}
          >
            {(
              createEvaluation: ({
                variables,
              }: {
                variables: EvaluationCreateType
              }) => void
            ): JSX.Element => (
              <EvaluationForm
                categories={categories}
                mode="create"
                rootPath={rootPath}
                submitAction={(variables): void =>
                  createEvaluation({ variables })
                }
              />
            )}
          </Mutation>
        </>
      )}
    </PageQueryHandler>
  )
}

export default withRouter(EvaluationCreate)
