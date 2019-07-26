// libraries
import * as React from 'react'
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
// graphql
import { UpdateRecord, DeleteRecord } from 'store/record/mutation'
import { addRecord, deleteRecord } from 'store/record/update'
// interfaces
import { NotificationCreate } from 'types/types'
import { CategoryFull } from 'store/category/type'
import { Record, RecordEdit as RecordEditType } from 'store/record/type'

interface Props extends RouteComponentProps {
  createNotificationBanner: (notification: NotificationCreate) => void
}
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
          <React.Fragment>
            <H1>Eintrag bearbeiten</H1>
            {recordQueryStatus}
            {categoryQueryStatus}
            {!recordQueryStatus && !categoryQueryStatus && category && record && (
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
                            id: Number(variables.id),
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
              </React.Fragment>
            )}
          </React.Fragment>
        )}
      </PageQueryHandler>
    )
  }

  // Form submit function
  private handleCompleted(): void {
    const { history, createNotificationBanner } = this.props

    // Inform user about success
    createNotificationBanner({
      type: 'success',
      message: `Eintrag erfolgreich bearbeitet`,
    })

    // Go to the dashboard
    history.push('/')
  }

  // Form error function
  private handleError(error: ApolloError): void {
    const { createNotificationBanner } = this.props
    createNotificationBanner({
      type: 'error',
      message: 'Bearbeitung des Eintrags fehlgeschlagen',
    })
    logError(error)
  }
}

export default withRouter(RecordEdit)
