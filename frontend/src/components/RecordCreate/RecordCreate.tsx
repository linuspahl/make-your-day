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
// interfaces
import { RecordCreate as RecordCreateType } from 'store/record/type'
import { Category } from 'store/category/type'
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
    // get id of parent category, to fetch all possible subcategorories
    const categoryId = extractIdFromUrl(match, 'categoryId')
    // extract query parameters.
    // createdAt will be used to create records for previous days.
    // subCategoryId will be set when the user has been to the record form befor,
    // but clicked on the link to create another subcategory
    const queryParams: {
      createdAt?: string
      subCategoryId?: string
    } = parseQueryParams(search)
    const {
      createdAt: createdAtParam,
      subCategoryId: subCategoryIdParam,
    } = queryParams

    return (
      <FadeTransition>
        <H1>Eintrag erstellen</H1>
        <Query query={GetCategoryWithChildren} variables={{ id: categoryId }}>
          {({
            loading,
            error,
            data,
          }: {
            loading: boolean
            error?: ApolloError
            data: { getCategory: Category }
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
              <Mutation
                mutation={CreateRecord}
                onCompleted={this.handleCompleted}
                onError={this.handleError}
                update={addRecord}
              >
                {(
                  createRecord: ({
                    variables,
                  }: {
                    variables: RecordCreateType
                  }) => void
                ): JSX.Element => (
                  <RecordForm
                    category={category}
                    params={{
                      createdAt: createdAtParam,
                      categoryId: parseInt(subCategoryIdParam, 10),
                    }}
                    mode="create"
                    rootPath={'/'}
                    submitAction={(variables: RecordCreateType): void =>
                      createRecord({ variables })
                    }
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
