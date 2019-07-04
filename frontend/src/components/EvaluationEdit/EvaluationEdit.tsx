// libraries
import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { ApolloError } from 'apollo-boost'
import { Query, Mutation } from 'react-apollo'
// utils
import { extractIdFromUrl, logError } from 'utils/utils'
// components
import EvaluationForm from 'components/EvaluationForm/EvaluationForm'
import FadeTransition from 'shared/FadeTransition/FadeTransition'
import H1 from 'shared/H1/H1'
// graphql
import { UpdateEvaluation } from 'store/evaluation/mutation'
import { GetEvaluationUpdate } from 'store/evaluation/query'
import { GetCategoriesWithChildren } from 'store/category/query'
// interfaces
import { NotificationCreate } from 'types/types'
import { Evaluation, EvaluationUpdate } from 'store/evaluation/type'
import { CategoryFull } from 'store/category/type'
import QueryStateHandler from 'shared/QueryStateHandler/QueryStateHandler'

interface Props extends RouteComponentProps {
  createNotificationBanner: (notification: NotificationCreate) => void
  rootPath: string
}

class EvaluationEdit extends React.Component<Props> {
  public constructor(props: Props) {
    super(props)

    this.handleCompleted = this.handleCompleted.bind(this)
    this.handleError = this.handleError.bind(this)
  }

  public render(): JSX.Element {
    const { match, rootPath } = this.props
    const evaluationId = extractIdFromUrl(match)

    return (
      <FadeTransition fullWidth>
        <H1 context="page">Auswertung bearbeiten</H1>

        <QueryStateHandler
          query={GetCategoriesWithChildren}
          queryName="getCategories"
          errorMessage="Kategorien konnten nicht geladen werden"
        >
          {(categories: CategoryFull[]): JSX.Element => (
            <QueryStateHandler
              query={GetEvaluationUpdate}
              variables={{ id: evaluationId }}
              errorMessage="Auswertung konnte nicht geladen werden"
              queryName="getEvaluation"
            >
              {(evaluation: Evaluation): JSX.Element => (
                <Mutation
                  mutation={UpdateEvaluation}
                  onCompleted={this.handleCompleted}
                  onError={this.handleError}
                >
                  {(
                    updateUser: ({
                      variables,
                    }: {
                      variables: EvaluationUpdate
                    }) => void
                  ): JSX.Element => (
                    <EvaluationForm
                      categories={categories}
                      initialData={evaluation}
                      rootPath={rootPath}
                      submitAction={(variables: EvaluationUpdate): void => {
                        console.log(variables)
                        updateUser({ variables })
                      }}
                    />
                  )}
                </Mutation>
              )}
            </QueryStateHandler>
          )}
        </QueryStateHandler>
      </FadeTransition>
    )
  }

  // Form submit function
  private handleCompleted(data: { updateEvaluation: Evaluation }): void {
    const { history, rootPath, createNotificationBanner } = this.props
    const {
      updateEvaluation: { title },
    } = data

    // Inform user about success
    createNotificationBanner({
      type: 'success',
      message: `Auswertung ${title} erfolgreich bearbeitet`,
    })

    // Go to the evaluations overview
    history.push(rootPath)
  }

  // Form error function
  private handleError(error: ApolloError): void {
    const { createNotificationBanner } = this.props
    createNotificationBanner({
      type: 'error',
      message: 'Bearbeitung der Auswertung fehlgeschlagen',
    })
    logError(error)
  }
}

export default withRouter(EvaluationEdit)
