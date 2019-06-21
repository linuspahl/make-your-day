// libraries
import * as React from 'react'
import { ApolloError } from 'apollo-boost'
import { Mutation, Query } from 'react-apollo'
import { withRouter, RouteComponentProps } from 'react-router-dom'
// utils
import { extractIdFromUrl, logError } from 'utils/utils'
// components
import ActionRow from 'shared/form/ActionRow/ActionRow'
import CenteredSpinner from 'shared/CenteredSpinner/CenteredSpinner'
import DeleteButton from 'shared/DeleteButton/DeleteButton'
import ErrorMessage from 'shared/ErrorMessage/ErrorMessage'
import FadeTransition from 'shared/FadeTransition/FadeTransition'
import H1 from 'shared/H1/H1'
import NoResult from 'shared/NoResult/NoResult'
import RecordForm from 'components/RecordForm/RecordForm'
// graphql
import { UpdateRecord, DeleteRecord } from 'store/record/mutation'
import { GetRecord } from 'store/record/query'
import { GetCategoryWithChildren } from 'store/category/query'
import { addRecord, deleteRecord } from 'store/record/update'
// interfaces
import { NotificationCreate } from 'types/types'
import { CategoryFull } from 'store/category/type'
import { Record, RecordCreate } from 'store/record/type'

interface Props extends RouteComponentProps {
  createNotificationBanner: (notification: NotificationCreate) => void
}

class RecordEdit extends React.Component<Props> {
  public constructor(props: Props) {
    super(props)

    this.handleCompleted = this.handleCompleted.bind(this)
    this.handleError = this.handleError.bind(this)
  }

  public render(): JSX.Element {
    const { match, history } = this.props
    const categoryId = extractIdFromUrl(match, 'categoryId')
    const recordId = extractIdFromUrl(match, 'id')

    return (
      <FadeTransition>
        <H1>Eintrag bearbeiten</H1>
        <Query query={GetCategoryWithChildren} variables={{ id: categoryId }}>
          {({
            loading,
            error,
            data,
          }: {
            loading: boolean
            error?: ApolloError
            data: { getCategory: CategoryFull }
          }): JSX.Element => {
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
              <Query query={GetRecord} variables={{ id: recordId }}>
                {({
                  loading,
                  error,
                  data,
                }: {
                  loading: boolean
                  error?: ApolloError
                  data: { getRecord: Record }
                }): JSX.Element => {
                  if (loading) return <CenteredSpinner />
                  if (error)
                    return (
                      <ErrorMessage
                        error={error}
                        message="Kategorie konnte nicht geladen werden"
                      />
                    )
                  const record = data.getRecord
                  if (!record) return <NoResult />

                  return (
                    <React.Fragment>
                      <Mutation
                        mutation={UpdateRecord}
                        onCompleted={this.handleCompleted}
                        onError={this.handleError}
                        update={addRecord}
                      >
                        {(
                          updateRecord: ({
                            variables,
                          }: {
                            variables: RecordCreate
                          }) => void
                        ): JSX.Element => (
                          <RecordForm
                            category={category}
                            rootPath={'/'}
                            initialData={record}
                            submitAction={(variables: RecordCreate): void => {
                              variables
                              updateRecord({ variables })
                            }}
                          />
                        )}
                      </Mutation>
                      <ActionRow>
                        <DeleteButton
                          id={record.id}
                          mutation={DeleteRecord}
                          onUpdate={deleteRecord}
                          title={record.title}
                          onDelete={(): void => history.push('/')}
                        />
                      </ActionRow>
                    </React.Fragment>
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

export default withRouter(RecordEdit)