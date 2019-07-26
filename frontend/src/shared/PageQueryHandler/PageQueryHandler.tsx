// libraries
import * as React from 'react'
import { ApolloError, DocumentNode } from 'apollo-boost'
import { Query } from 'react-apollo'
// components
import LoadingSpinner from 'shared/LoadingSpinner/LoadingSpinner'
import CenteredSpinner from 'shared/CenteredSpinner/CenteredSpinner'
import ErrorMessage from 'shared/ErrorMessage/ErrorMessage'
import NoResult from 'shared/NoResult/NoResult'
import ContentBox from 'shared/ContentBox/ContentBox'
import FadeTransition from 'shared/FadeTransition/FadeTransition'

interface Props {
  children: (
    result?: object[] | object,
    status?: { [queryNames: string]: JSX.Element }
  ) => JSX.Element
  // dataTestId
  // - allows custom test id, so far only needed to test
  //   if a route renders the correct component
  // - only used for LoadingSpinner with hasDelay={true}
  dataTestId?: string
  // errorMessage - What to display, if the query fails?
  errorMessages: { [key: string]: string }
  // query - grqphql query from store, like `GetCategories`
  query: DocumentNode
  // queryNames - name of the actual query function, used inside of the provided query definition
  // like `getCategories`
  queryNames: string[]
  // variables - If you need to run the query with specific variables
  variables?: object
  loadingPlaceholder?: JSX.Element
}

const PageQueryHandler = (props: Props): JSX.Element => {
  const {
    children,
    dataTestId,
    errorMessages,
    loadingPlaceholder,
    query,
    queryNames,
    variables,
  } = props

  return (
    <Query query={query} variables={variables}>
      {({
        loading,
        error,
        data,
      }: {
        loading: boolean
        error?: ApolloError
        data: { [key: string]: object[] }
      }): JSX.Element => {
        let result: {
          data: { [key: string]: object }
          status: { [key: string]: JSX.Element }
        } = { data: data || {}, status: {} }
        // show spinner, when loading
        console.log(loading, error, data)
        if (loading) {
          return loadingPlaceholder ? (
            loadingPlaceholder
          ) : (
            <LoadingSpinner hasDelay dataTestId={dataTestId}>
              <CenteredSpinner />
            </LoadingSpinner>
          )
        }

        // Set status and for each query individually
        queryNames.forEach((queryName): void => {
          if (error) {
            result.status[queryName] = (
              <ErrorMessage error={error} message={errorMessages[queryName]} />
            )
          }

          if (
            !error && Array.isArray(data[queryName])
              ? data[queryName].length === 0
              : !data || !data[queryName]
          ) {
            result.status[queryName] = <NoResult />
          }
        })

        return (
          <FadeTransition fullWidth>
            <ContentBox role="main">{children(result)}</ContentBox>
          </FadeTransition>
        )
      }}
    </Query>
  )
}
export default PageQueryHandler
