// libraries
import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Query, Mutation } from 'react-apollo'
import { ApolloError } from 'apollo-boost'
// utils
import { extractIdFromUrl, logError } from 'utils/utils'
// components
import CenteredSpinner from 'shared/CenteredSpinner/CenteredSpinner'
import ErrorMessage from 'shared/ErrorMessage/ErrorMessage'
import FadeTransition from 'shared/FadeTransition/FadeTransition'
import H1 from 'shared/H1/H1'
import NoResult from 'shared/NoResult/NoResult'
import WidgetForm from 'components/WidgetForm/WidgetForm'
// graphql
import { UpdateWidget } from 'store/widget/mutation'
import { GetWidget } from 'store/widget/query'
import { GetEvaluations } from 'store/evaluation/query'
// interfaces
import { NotificationCreate } from 'types/types'
import { Widget } from 'store/widget/type'

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

  public render(): React.ReactElement {
    const { match, rootPath } = this.props
    const widgetId = extractIdFromUrl(match)

    return (
      <FadeTransition fullWidth>
        <H1 context="page">Widget bearbeiten</H1>

        <Query query={GetEvaluations}>
          {({ loading, error, data }) => {
            if (loading) return <CenteredSpinner />
            if (error)
              return (
                <ErrorMessage
                  error={error}
                  message="Kategorien konnten nicht geladen werden"
                />
              )

            const evaluations = data.getEvaluations
            return (
              <Query query={GetWidget} variables={{ id: widgetId }}>
                {({ loading, error, data }) => {
                  if (loading) return <CenteredSpinner />
                  if (error)
                    return (
                      <ErrorMessage
                        error={error}
                        message="Widget konnte nicht geladen werden"
                      />
                    )
                  if (!data.getWidget.id) return <NoResult />
                  return (
                    <Mutation
                      mutation={UpdateWidget}
                      onCompleted={this.handleCompleted}
                      onError={this.handleError}
                    >
                      {updateUser => (
                        <WidgetForm
                          evaluations={evaluations}
                          initialData={data.getWidget}
                          rootPath={rootPath}
                          submitAction={(variables: Widget) =>
                            updateUser({ variables })
                          }
                        />
                      )}
                    </Mutation>
                  )
                }}
              </Query>
            )
          }}
        </Query>
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
      message: 'Bearbeitung der Widget fehlgeschlagen',
    })
    logError(error)
  }
}

export default withRouter(WidgetEdit)
