// libraries
import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Mutation, Query } from 'react-apollo'
import { ApolloError } from 'apollo-boost'
// utils
import { extractIdFromUrl, logError, parseQueryParams } from 'utils/utils'
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
import { NotificationCreate } from 'types/types'

interface Props extends RouteComponentProps {
  createNotificationBanner: (notification: NotificationCreate) => void
}

class RecordCreate extends React.Component<Props> {
  public constructor(props: Props) {
    super(props)

    this.handleCompleted = this.handleCompleted.bind(this)
    this.handleError = this.handleError.bind(this)
  }

  public render(): React.ReactElement {
    const {
      match,
      location: { search },
    } = this.props
    const categoryId = extractIdFromUrl(match, 'categoryId')
    const queryParams: { createdAt?: string } = parseQueryParams(search)
    const { createdAt } = queryParams

    return (
      <FadeTransition>
        <H1>Eintrag erstellen</H1>
        <Query query={GetCategoryWithChildren} variables={{ id: categoryId }}>
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
                    params={{ createdAt }}
                    mode="create"
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
  private handleCompleted(): void {
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
  private handleError(error: ApolloError): void {
    const { createNotificationBanner } = this.props
    createNotificationBanner({
      type: 'error',
      message: 'Erstellung des Eintrags fehlgeschlagen',
    })
    logError(error)
  }
}

export default withRouter(RecordCreate)
