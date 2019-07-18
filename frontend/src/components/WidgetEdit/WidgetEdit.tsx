// libraries
import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import { ApolloError } from 'apollo-boost'
// utils
import { extractIdFromUrl, logError } from 'utils/utils'
// components
import ContentBox from 'shared/ContentBox/ContentBox'
import FadeTransition from 'shared/FadeTransition/FadeTransition'
import H1 from 'shared/H1/H1'
import QueryStateHandler from 'shared/QueryStateHandler/QueryStateHandler'
import WidgetForm from 'components/WidgetForm/WidgetForm'
// graphql
import { UpdateWidget } from 'store/widget/mutation'
import { GetWidget } from 'store/widget/query'
import { GetEvaluations } from 'store/evaluation/query'
// interfaces
import { NotificationCreate } from 'types/types'
import { Widget } from 'store/widget/type'
import { Evaluation } from 'store/evaluation/type'

interface Props extends RouteComponentProps {
  createNotificationBanner: (notification: NotificationCreate) => void
  rootPath: string
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
      <FadeTransition fullWidth>
        <ContentBox role="main">
          <H1 context="page">Widget bearbeiten</H1>
          <QueryStateHandler
            query={GetEvaluations}
            queryName="getEvaluations"
            errorMessage="Auswertungen konnten nicht geladen werden"
            ignoreEmptyResult
          >
            {(evaluations?: Evaluation[]): JSX.Element => {
              return (
                <QueryStateHandler
                  errorMessage="Widget konnte nicht geladen werden"
                  query={GetWidget}
                  queryName="getWidget"
                  variables={{ id: widgetId }}
                >
                  {(widget: Widget): JSX.Element => (
                    <Mutation
                      mutation={UpdateWidget}
                      onCompleted={this.handleCompleted}
                      onError={this.handleError}
                    >
                      {(
                        updateUser: ({
                          variables,
                        }: {
                          variables: Widget
                        }) => void
                      ): JSX.Element => (
                        <WidgetForm
                          evaluations={evaluations}
                          initialData={widget}
                          rootPath={rootPath}
                          submitAction={(variables: Widget): void =>
                            updateUser({ variables })
                          }
                        />
                      )}
                    </Mutation>
                  )}
                </QueryStateHandler>
              )
            }}
          </QueryStateHandler>
        </ContentBox>
      </FadeTransition>
    )
  }

  // Form submit function
  private handleCompleted(data: { updateWidget: Widget }): void {
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
