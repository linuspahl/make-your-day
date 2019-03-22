// libraries
import React from 'react'
import { withRouter } from 'react-router-dom'
import { Mutation } from 'react-apollo'
// utils
import { logError } from 'utils/utils'
// components
import FadeTransition from 'shared/FadeTransition/FadeTransition'
import H1 from 'shared/H1/H1.tsx'
import WidgetForm from 'components/WidgetForm/WidgetForm'
import CenteredSpinner from 'shared/CenteredSpinner/CenteredSpinner'
import ErrorMessage from 'shared/ErrorMessage/ErrorMessage'
// graphql
import { Query } from 'react-apollo'
import { addWidget } from 'store/widget/update'
import { CreateWidget } from 'store/widget/mutation.gql'
import { GetEvaluations } from 'store/evaluation/query.gql'

class WidgetCreate extends React.Component {
  constructor(props) {
    super(props)

    this.handleCompleted = this.handleCompleted.bind(this)
    this.hanldeError = this.hanldeError.bind(this)
  }

  render() {
    const { rootPath } = this.props
    return (
      <FadeTransition fullWidth>
        <H1 context="page">Widget erstellen</H1>
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

            return (
              <Mutation
                mutation={CreateWidget}
                onCompleted={this.handleCompleted}
                onError={this.hanldeError}
                update={addWidget}
              >
                {createWidget => (
                  <WidgetForm
                    mode="create"
                    mutation={CreateWidget}
                    evaluations={data.getEvaluations}
                    rootPath={rootPath}
                    submitAction={variables => createWidget({ variables })}
                    initialData={{
                      type: 'textarea',
                      position: 'dashboard-bottom',
                    }}
                  />
                )}
              </Mutation>
            )
          }}
        </Query>
      </FadeTransition>
    )
  }

  // Form submit function
  async handleCompleted(data) {
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
  hanldeError(error) {
    const { createNotificationBanner } = this.props
    createNotificationBanner({
      type: 'error',
      message: 'Erstellung des Widgets fehlgeschlagen',
    })
    logError(error)
  }
}

export default withRouter(WidgetCreate)
