// libraries
import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import { ApolloError } from 'apollo-boost'
// utils
import { logError } from 'utils/utils'
// components
import H1 from 'shared/H1/H1'
import PageQueryHandler from 'shared/PageQueryHandler/PageQueryHandler'
import WidgetForm from 'components/WidgetForm/WidgetForm'
// graphql
import { addWidget } from 'store/widget/update'
import { CreateWidget } from 'store/widget/mutation'
import { GetEvaluations } from 'store/evaluation/query'
// interfaces
import { NotificationCreate } from 'types/types'
import { WidgetCreate as WidgetCreateType, Widget } from 'store/widget/type'
import { Evaluation } from 'store/evaluation/type'

interface Props extends RouteComponentProps {
  createNotificationBanner: (notification: NotificationCreate) => void
  rootPath: string
}

interface PageQueryResult {
  data?: { getEvaluations: Evaluation[] }
  status?: { getEvaluations: JSX.Element }
}

class WidgetCreate extends React.Component<Props> {
  public constructor(props: Props) {
    super(props)

    this.handleCompleted = this.handleCompleted.bind(this)
    this.hanldeError = this.hanldeError.bind(this)
  }

  public render(): JSX.Element {
    const { rootPath } = this.props
    return (
      <PageQueryHandler
        errorMessages={{
          getEvaluations: 'Kategorien konnten nicht geladen werden',
        }}
        query={GetEvaluations}
        queryNames={['getEvaluations']}
      >
        {({
          data: { getEvaluations: evaluations },
          status: { getEvaluations: evaluationsQueryStatus },
        }: PageQueryResult): JSX.Element => {
          return (
            <React.Fragment>
              <H1 context="page">Widget erstellen</H1>
              {evaluationsQueryStatus}
              {!evaluationsQueryStatus && evaluations && (
                <Mutation
                  mutation={CreateWidget}
                  onCompleted={this.handleCompleted}
                  onError={this.hanldeError}
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
              )}
            </React.Fragment>
          )
        }}
      </PageQueryHandler>
    )
  }

  // Form submit function
  private handleCompleted(data: { createWidget: Widget }): void {
    const { history, rootPath, createNotificationBanner } = this.props
    const {
      createWidget: { title },
    } = data

    // Inform user about success
    createNotificationBanner({
      type: 'success',
      message: `Widget ${title} erfolgreich erstellt`,
    })

    // Go to the widgets overview
    history.push(rootPath)
  }

  // Form error function
  private hanldeError(error: ApolloError): void {
    const { createNotificationBanner } = this.props
    createNotificationBanner({
      type: 'error',
      message: 'Erstellung des Widgets fehlgeschlagen',
    })
    logError(error)
  }
}

export default withRouter(WidgetCreate)
