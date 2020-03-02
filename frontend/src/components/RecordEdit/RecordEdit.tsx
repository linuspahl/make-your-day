// libraries
import React, { useContext } from 'react'
import { ApolloError } from 'apollo-boost'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { withRouter, RouteComponentProps } from 'react-router-dom'
// utils
import { extractIdFromUrl, logError } from 'utils/utils'
// components
import ActionRow from 'shared/form/ActionRow/ActionRow'
import DeleteButton from 'shared/DeleteButton/DeleteButton'
import H1 from 'shared/H1/H1'
import PageQueryHandler from 'shared/PageQueryHandler/PageQueryHandler'
import RecordForm from 'components/RecordForm/RecordForm'
// contexts
import AppContext from 'contexts/AppContext'
// graphql
import { UpdateRecord, DeleteRecord } from 'store/record/mutation'
import { addRecord, deleteRecord } from 'store/record/update'
// interfaces
import { NotificationCreate } from 'types/types'
import { CategoryFull } from 'store/category/type'
import { Record, RecordEdit as RecordEditType } from 'store/record/type'

interface PageQueryResult {
  data: { getCategory: CategoryFull; getRecord: Record }
  status: { getCategory: JSX.Element; getRecord: JSX.Element }
}

const pageQuery = gql`
  query($recordId: ID!, $categoryId: ID!) {
    getCategory(id: $categoryId) {
      color
      hasDescription
      hasSubcategories
      hasTitle
      hasUnit
      icon
      id
      title
      type
      unit
      subcategories {
        id
        title
      }
    }
    getRecord(id: $recordId) {
      id
      title
      amount
      description
      createdAt
      categoryId
      category {
        color
        hasUnit
        icon
        id
        title
        type
        unit
      }
    }
  }
`
// Form submit function
const handleCompleted = (
  props: RouteComponentProps,
  createNotificationBanner: (notification: NotificationCreate) => void
): void => {
  const { history } = props

  // Inform user about success
  createNotificationBanner({
    type: 'success',
    message: `Eintrag erfolgreich bearbeitet`,
  })

  // Go to the dashboard
  history.push('/')
}

// Form error function
const handleError = (
  createNotificationBanner: (notification: NotificationCreate) => void
): ((error: ApolloError) => void) => {
  return (error): void => {
    createNotificationBanner({
      type: 'error',
      message: 'Bearbeitung des Eintrags fehlgeschlagen',
    })
    logError(error)
  }
}

const RecordEdit = (props: RouteComponentProps): JSX.Element => {
  const { match, history } = props
  const { createNotificationBanner } = useContext(AppContext)
  const categoryId = extractIdFromUrl(match, 'categoryId')
  const recordId = extractIdFromUrl(match, 'id')
  const onCompleted = (): void =>
    handleCompleted(props, createNotificationBanner)
  const onError = handleError(createNotificationBanner)
  return (
    <PageQueryHandler
      dataTestId="RecordEdit"
      errorMessages={{
        getCategory: 'Kategorie konnte nicht geladen werden',
        getRecord: 'Eintrag konnte nicht geladen werden',
      }}
      query={pageQuery}
      queryNames={['getCategory', 'getRecord']}
      variables={{ categoryId, recordId }}
    >
      {({
        data: { getCategory: category, getRecord: record },
        status: {
          getCategory: categoryQueryStatus,
          getRecord: recordQueryStatus,
        },
      }: PageQueryResult): JSX.Element => (
        <>
          <H1>Eintrag bearbeiten</H1>
          {recordQueryStatus}
          {categoryQueryStatus}
          {!recordQueryStatus && !categoryQueryStatus && category && record && (
            <>
              <Mutation
                mutation={UpdateRecord}
                onCompleted={onCompleted}
                onError={onError}
                update={addRecord}
              >
                {(
                  updateRecord: ({
                    variables,
                  }: {
                    variables: RecordEditType
                  }) => void
                ): JSX.Element => (
                  <RecordForm
                    initialData={record}
                    category={category}
                    rootPath={'/'}
                    submitAction={(variables: RecordEditType): void => {
                      updateRecord({
                        variables: {
                          amount: variables.amount,
                          description: variables.description,
                          id: variables.id,
                          title: variables.title,
                        },
                      })
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
            </>
          )}
        </>
      )}
    </PageQueryHandler>
  )
}

export default withRouter(RecordEdit)
