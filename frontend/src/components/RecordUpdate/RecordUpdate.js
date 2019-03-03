// libraries
import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { Mutation, Query } from 'react-apollo'
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
import { UpdateRecord, DeleteRecord } from 'store/record/mutation.gql'
import { GetRecord } from 'store/record/query.gql'
import { GetCategoryWithChildren } from 'store/category/query.gql'
import { addRecord, deleteRecord } from 'store/record/update'

class RecordCreate extends React.Component {
  constructor(props) {
    super(props)

    this.handleCompleted = this.handleCompleted.bind(this)
    this.handleError = this.handleError.bind(this)
  }

  render() {
    const { match, history } = this.props
    const categoryId = extractIdFromUrl(match, 'categoryId')
    const recordId = extractIdFromUrl(match, 'id')

    return (
      <FadeTransition>
        <H1 context="page">Eintrag bearbeiten</H1>
        <Query
          query={GetCategoryWithChildren}
          variables={{ id: parseInt(categoryId, 10) }}
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
              <Query
                query={GetRecord}
                variables={{ id: parseInt(recordId, 10) }}
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
                  const record = data.getRecord
                  if (!record) return <NoResult />

                  const initialData = {
                    categoryId: record.category.id,
                    ...record,
                  }

                  return (
                    <Fragment>
                      <Mutation
                        mutation={UpdateRecord}
                        onCompleted={this.handleCompleted}
                        onError={this.handleError}
                        update={addRecord}
                      >
                        {updateRecord => (
                          <RecordForm
                            category={category}
                            rootPath={'/'}
                            initialData={initialData}
                            submitAction={variables =>
                              updateRecord({ variables })
                            }
                          />
                        )}
                      </Mutation>
                      <ActionRow>
                        <DeleteButton
                          context="delete"
                          id={record.id}
                          mutation={DeleteRecord}
                          onUpdate={deleteRecord}
                          title={record.title}
                          onDelete={() => history.push('/')}
                        />
                      </ActionRow>
                    </Fragment>
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
  async handleCompleted() {
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
  handleError(error) {
    const { createNotificationBanner } = this.props
    createNotificationBanner({
      type: 'error',
      message: 'Erstellung des Eintrags fehlgeschlagen',
    })
    logError(error)
  }
}

export default withRouter(RecordCreate)
