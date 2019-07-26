// libraries
import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import { ApolloError } from 'apollo-boost'
// utils
import { logError } from 'utils/utils'
// components
import EvaluationForm from 'components/EvaluationForm/EvaluationForm'
import H1 from 'shared/H1/H1'
import PageQueryHandler from 'shared/PageQueryHandler/PageQueryHandler'
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
  createNotificationBanner: (notification: NotificationCreate) => void
  rootPath: string
}

class EvaluationCreate extends React.Component<Props> {
  public constructor(props: Props) {
    super(props)

    this.handleCompleted = this.handleCompleted.bind(this)
    this.handleError = this.handleError.bind(this)
  }

  public render(): JSX.Element {
    const { rootPath } = this.props
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
          <React.Fragment>
            <H1 context="page">Auswertung erstellen</H1>
            <Mutation
              mutation={CreateEvaluation}
              onCompleted={this.handleCompleted}
              onError={this.handleError}
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
          </React.Fragment>
        )}
      </PageQueryHandler>
    )
  }

  // Form submit function
  private handleCompleted(data: { createEvaluation: EvaluationEdit }): void {
    const { history, rootPath, createNotificationBanner } = this.props
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

  // Form error function
  private handleError(error: ApolloError): void {
    const { createNotificationBanner } = this.props
    createNotificationBanner({
      type: 'error',
      message: 'Erstellung der Auswertung fehlgeschlagen',
    })
    logError(error)
  }
}

export default withRouter(EvaluationCreate)
