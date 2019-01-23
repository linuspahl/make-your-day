// libraries
import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { Mutation } from 'react-apollo'
// utils
import { logError } from 'utils/utils'
// components
import H1 from 'shared/H1/H1'
import WidgetForm from 'components/WidgetForm/WidgetForm'
// graphql
import { addWidget } from 'store/widget/update'
import { CreateWidget } from 'store/widget/mutation.gql'

class WidgetCreate extends React.Component {
  // Form submit function
  async onComplete(data) {
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
  onError(error) {
    const { createNotificationBanner } = this.props
    createNotificationBanner({
      type: 'error',
      message: 'Erstellung des Widgets fehlgeschlagen',
    })
    logError(error)
  }

  render() {
    const { rootPath, createNotificationBanner } = this.props
    return (
      <Fragment>
        <H1 context="page">Widget erstellen</H1>
        <Mutation
          mutation={CreateWidget}
          onCompleted={this.onComplete.bind(this)}
          onError={this.onError.bind(this)}
          update={addWidget}
        >
          {createWidget => (
            <WidgetForm
              mode="create"
              mutation={CreateWidget}
              rootPath={rootPath}
              submitAction={variables => createWidget({ variables })}
              initialData={{ type: 'textarea' }}
            />
          )}
        </Mutation>
      </Fragment>
    )
  }
}

export default withRouter(WidgetCreate)
