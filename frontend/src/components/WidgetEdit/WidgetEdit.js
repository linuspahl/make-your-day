// libraries
import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'
// utils
import { extractIdFromUrl, logError } from 'utils/utils'
// components
import H1 from 'shared/H1/H1'
import WidgetForm from 'components/WidgetForm/WidgetForm'
import CenteredSpinner from 'shared/CenteredSpinner/CenteredSpinner'
import ErrorMessage from 'shared/ErrorMessage/ErrorMessage'
import NoResult from 'shared/NoResult/NoResult'
// graphql
import { Query, Mutation } from 'react-apollo'
import { UpdateWidget } from 'store/widget/mutation.gql'
import { GetWidget } from 'store/widget/query.gql'

class WidgetEdit extends React.Component {
  // Form submit function
  async onComplete(data) {
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
  onError(error) {
    const { createNotificationBanner } = this.props
    createNotificationBanner({
      type: 'error',
      message: 'Bearbeitung der Widget fehlgeschlagen',
    })
    logError(error)
  }

  render() {
    const { match, rootPath } = this.props
    const widgetId = extractIdFromUrl(match)

    return (
      <Fragment>
        <H1 context="page">Widget bearbeiten</H1>

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
                onCompleted={this.onComplete.bind(this)}
                onError={this.onError.bind(this)}
              >
                {updateUser => (
                  <WidgetForm
                    initialData={data.getWidget}
                    rootPath={rootPath}
                    submitAction={variables => updateUser({ variables })}
                  />
                )}
              </Mutation>
            )
          }}
        </Query>
      </Fragment>
    )
  }
}

export default withRouter(WidgetEdit)