// libraries
import React, { useContext } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import { ApolloError } from 'apollo-boost'
// utils
import { extractIdFromUrl, logError, parseQueryParams } from 'utils/utils'
// components
import H1 from 'shared/H1/H1'
import PageQueryHandler from 'shared/PageQueryHandler/PageQueryHandler'
import RecordForm from 'components/RecordForm/RecordForm'
// contexts
import AppContext from 'contexts/AppContext'
// graphql
import { CreateRecord } from 'store/record/mutation'
import { GetCategoryWithChildren } from 'store/category/query'
import { addRecord } from 'store/record/update'
// interfaces
import { RecordCreate as RecordCreateType } from 'store/record/type'
import { Category } from 'store/category/type'
import { NotificationCreate } from 'types/types'

interface PageQueryResult {
  data: { getCategory: Category }
  status: { getCategory: JSX.Element }
}

// Form submit function
const handleCompleted = (
  props: RouteComponentProps,
  createNotificationBanner: (notification: NotificationCreate) => void
): void => {
  const { history } = props

  // Inform user about success
  createNotificationBanner({
    type: 'success',
    message: `Eintrag erfolgreich erstellt`,
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
      message: 'Erstellung des Eintrags fehlgeschlagen',
    })
    logError(error)
  }
}

const RecordCreate = (props: RouteComponentProps): JSX.Element => {
  const {
    match,
    location: { search },
  } = props
  const { createNotificationBanner } = useContext(AppContext)
  const onCompleted = (): void =>
    handleCompleted(props, createNotificationBanner)
  const onError = handleError(createNotificationBanner)
  // get id of parent category, to fetch all possible subcategorories
  const categoryId = extractIdFromUrl(match, 'categoryId')
  // extract query parameters.
  // createdAt will be used to create records for previous days.
  // subCategoryId will be set when the user has been to the record form befor,
  // but clicked on the link to create another subcategory
  const queryParams: {
    createdAt?: string
    subcategoryId?: string
  } = parseQueryParams(search)
  const {
    createdAt: createdAtParam,
    subcategoryId: subcategoryIdParam,
  } = queryParams

  return (
    <PageQueryHandler
      dataTestId="RecordCreate"
      errorMessages={{ getCategory: 'Kategorie konnte nicht geladen werden' }}
      query={GetCategoryWithChildren}
      queryNames={['getCategory']}
      variables={{ id: categoryId }}
      childrenKey={`category-${categoryId}`}
    >
      {({
        data: { getCategory: category },
        status: { getCategory: categoryQueryResult },
      }: PageQueryResult): JSX.Element => (
        <React.Fragment>
          <H1>Eintrag erstellen</H1>
          {categoryQueryResult}
          {!categoryQueryResult && category && (
            <Mutation
              mutation={CreateRecord}
              onCompleted={onCompleted}
              onError={onError}
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
                    subcategoryId: subcategoryIdParam,
                  }}
                  mode="create"
                  rootPath={'/'}
                  submitAction={(variables: RecordCreateType): void =>
                    createRecord({ variables })
                  }
                />
              )}
            </Mutation>
          )}
        </React.Fragment>
      )}
    </PageQueryHandler>
  )
}

export default withRouter(RecordCreate)
