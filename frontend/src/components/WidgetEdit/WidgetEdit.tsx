// libraries
import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import { ApolloError } from 'apollo-boost'
import gql from 'graphql-tag'
// utils
import { extractIdFromUrl, logError } from 'utils/utils'
// components
import H1 from 'shared/H1/H1'
import PageQueryHandler from 'shared/PageQueryHandler/PageQueryHandler'
import WidgetForm from 'components/WidgetForm/WidgetForm'
// graphql
import { UpdateWidget } from 'store/widget/mutation'
// interfaces
import { NotificationCreate } from 'types/types'
import {
  Widget,
  WidgetCreate,
  WidgetEdit as WidgetEditType,
} from 'store/widget/type'
import { Evaluation } from 'store/evaluation/type'

export const pageQuery = gql`
  query($widgetId: ID!) {
    getEvaluations {
      id
      title
    }
    getWidget(id: $widgetId) {
      evaluationId
      id
      position
      title
      type
      value
    }
  }
`

interface Props extends RouteComponentProps {
  createNotificationBanner: (notification: NotificationCreate) => void
  rootPath: string
}

interface PageQueryResult {
  data: { getWidget: Widget; getEvaluations: Evaluation[] }
  status?: {
    getWidget: JSX.Element
    getEvaluations: JSX.Element
  }
}
class WidgetEdit extends React.Component<Props> {
  public constructor(props: Props) {
    super(props)

    this.handleCompleted = this.handleCompleted.bind(this)
    this.handleError = this.handleError.bind(this)
  }

  public render(): JSX.Element {
    const { match, rootPath } = this.props
    const widgetId = extractIdFromUrl(match)

    return (
      <PageQueryHandler
        dataTestId="WidgetEdit"
        query={pageQuery}
        queryNames={['getEvaluations', 'getWidget']}
        errorMessages={{
          getWidget: 'Widget konnte nicht geladen werden',
          getEvaluations: 'Auswertungen konnten nicht geladen werden',
        }}
        variables={{ widgetId }}
      >
        {({
          data: { getWidget: widget, getEvaluations: evaluations },
          status: { getWidget: widgetQueryStatus },
        }: PageQueryResult): JSX.Element => {
          return (
            <React.Fragment>
              <H1 context="page">Widget bearbeiten</H1>
              {widgetQueryStatus}
              {!widgetQueryStatus && widget && (
                <Mutation
                  mutation={UpdateWidget}
                  onCompleted={this.handleCompleted}
                  onError={this.handleError}
                >
                  {(
                    updateUser: ({
                      variables,
                    }: {
                      variables: WidgetEditType
                    }) => void
                  ): JSX.Element => (
                    <WidgetForm
                      evaluations={evaluations}
                      initialData={widget}
                      rootPath={rootPath}
                      submitAction={(variables: WidgetCreate): void =>
                        updateUser({
                          variables: {
                            id: widget.id,
                            evaluationId: variables.evaluationId,
                            position: variables.position,
                            title: variables.title,
                          },
                        })
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
  private handleCompleted(data: { updateWidget: WidgetEditType }): void {
    const { history, rootPath, createNotificationBanner } = this.props
    const {
      updateWidget: { title },
    } = data

    // Inform user about success
    createNotificationBanner({
      type: 'success',
      message: `Widget ${title} erfolgreich bearbeitet`,
    })

    // Go to the widgets overview
    history.push(rootPath)
  }

  // Form error function
  private handleError(error: ApolloError): void {
    const { createNotificationBanner } = this.props
    createNotificationBanner({
      type: 'error',
      message: 'Bearbeitung des Widgets fehlgeschlagen',
    })
    logError(error)
  }
}

export default withRouter(WidgetEdit)
