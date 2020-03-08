// libraries
import React, { useContext } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import { ApolloError } from 'apollo-boost'
// utils
import { logError } from 'utils/utils'
// components
import H1 from 'shared/H1/H1'
import PageQueryHandler from 'shared/PageQueryHandler/PageQueryHandler'
import WidgetForm from 'components/WidgetForm/WidgetForm'
// contexts
import AppContext from 'contexts/AppContext'
// graphql
import { addWidget } from 'store/widget/update'
import { CreateWidget } from 'store/widget/mutation'
import { GetEvaluationsForList } from 'store/evaluation/query'
// interfaces
import { NotificationCreate } from 'types/types'
import { WidgetCreate as WidgetCreateType, Widget } from 'store/widget/type'
import { EvaluationForList } from 'store/evaluation/type'

interface Props extends RouteComponentProps {
  rootPath: string
}

interface PageQueryResult {
  data?: { getEvaluations: EvaluationForList[] }
  status?: { getEvaluations: JSX.Element }
}

interface SubmitResult {
  createWidget: Widget
}

// Form submit function
const onSubmitComplete = (
  { createWidget: { title } }: SubmitResult,
  rootPath: Props['rootPath'],
  history: Props['history'],
  createNotificationBanner: (notification: NotificationCreate) => void
): void => {
  // Inform user about success
  createNotificationBanner({
    type: 'success',
    message: `Widget ${title} erfolgreich erstellt`,
  })

  // Go to the widgets overview
  history.push(rootPath)
}

// Form error function
const onSubmitError = (
  error: ApolloError,
  createNotificationBanner: (notification: NotificationCreate) => void
): void => {
  createNotificationBanner({
    type: 'error',
    message: 'Erstellung des Widgets fehlgeschlagen',
  })
  logError(error)
}

const WidgetCreate = ({ rootPath, history }: Props): JSX.Element => {
  const { createNotificationBanner } = useContext(AppContext)

  const handleSubmitComplete = (data: SubmitResult): void =>
    onSubmitComplete(data, rootPath, history, createNotificationBanner)
  const handleSubmitError = (error: ApolloError): void =>
    onSubmitError(error, createNotificationBanner)

  return (
    <PageQueryHandler
      dataTestId="WidgetCreate"
      errorMessages={{
        getEvaluations: 'Kategorien konnten nicht geladen werden',
      }}
      query={GetEvaluationsForList}
      queryNames={['getEvaluations']}
    >
      {({
        data: { getEvaluations: evaluations },
      }: PageQueryResult): JSX.Element => {
        return (
          <>
            <H1 context="page">Widget erstellen</H1>

            <Mutation
              mutation={CreateWidget}
              onCompleted={handleSubmitComplete}
              onError={handleSubmitError}
              update={addWidget}
            >
              {(
                createWidget: ({
                  variables,
                }: {
                  variables: WidgetCreateType
                }) => void
              ): JSX.Element => (
                <WidgetForm
                  mode="create"
                  evaluations={evaluations}
                  rootPath={rootPath}
                  submitAction={(variables: WidgetCreateType): void =>
                    createWidget({ variables })
                  }
                />
              )}
            </Mutation>
          </>
        )
      }}
    </PageQueryHandler>
  )
}

export default withRouter(WidgetCreate)
