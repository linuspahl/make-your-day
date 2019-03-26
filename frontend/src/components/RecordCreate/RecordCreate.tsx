// libraries
import * as React from 'react'
import * as moment from 'moment'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Mutation, Query } from 'react-apollo'
// utils
import { extractIdFromUrl, logError } from 'utils/utils'
// components
import CenteredSpinner from 'shared/CenteredSpinner/CenteredSpinner'
import ErrorMessage from 'shared/ErrorMessage/ErrorMessage'
import FadeTransition from 'shared/FadeTransition/FadeTransition'
import H1 from 'shared/H1/H1'
import NoResult from 'shared/NoResult/NoResult'
import RecordForm from 'components/RecordForm/RecordForm'
// graphql
import { CreateRecord } from 'store/record/mutation'
import { GetCategoryWithChildren } from 'store/category/query'
import { addRecord } from 'store/record/update'
import { NotificationCreate } from 'types/types';
import { ApolloError } from 'apollo-boost';


interface Props extends RouteComponentProps {
  createNotificationBanner: (notification: NotificationCreate) => void
}

class RecordCreate extends React.Component<Props> {
  constructor(props: Props) {
    super(props)

    this.handleCompleted = this.handleCompleted.bind(this)
    this.handleError = this.handleError.bind(this)
  }

  render() {
    const {
      history: {
        location: { search },
      },
      match,
    } = this.props
    const urlParams = new URLSearchParams(search)
    const categoryId = extractIdFromUrl(match, 'categoryId')

    return (
      <FadeTransition>
        <H1 context="page">Eintrag erstellen</H1>
        <Query
          query={GetCategoryWithChildren}
          variables={{ id: categoryId }}
        >
          {({ loading, error, data }) => {
            if (loading) return <CenteredSpinner />
            if (error)
              return (
                <ErrorMessage
                  error={error}
                  message="Kategorie konnte nicht geladen werden"
                />
              )
            const category = data.getCategory
            if (!category) return <NoResult />

            return (
              <Mutation
                mutation={CreateRecord}
                onCompleted={this.handleCompleted}
                onError={this.handleError}
                update={addRecord}
              >
                {createRecord => (
                  <RecordForm
                    category={category}
                    mode="create"
                    params={null}
                    rootPath={'/'}
                    submitAction={variables => createRecord({ variables })}
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
  handleCompleted() {
    const { history, createNotificationBanner } = this.props

    // Inform user about success
    createNotificationBanner({
      type: 'success',
      message: `Eintrag erfolgreich erstellt`,
    })

    // Go to the dashboard
    history.push('/')
  }

  // Form error function
  handleError(error: ApolloError) {
    const { createNotificationBanner } = this.props
    createNotificationBanner({
      type: 'error',
      message: 'Erstellung des Eintrags fehlgeschlagen',
    })
    logError(error)
  }
}

export default withRouter(RecordCreate)