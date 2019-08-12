// This component will be used for all overview components

// libraries
import React from 'react'
import { ApolloError, DocumentNode } from 'apollo-boost'
import { Query } from 'react-apollo'
// components
import LoadingSpinner from 'shared/LoadingSpinner/LoadingSpinner'
import CenteredSpinner from 'shared/CenteredSpinner/CenteredSpinner'
import ErrorMessage from 'shared/ErrorMessage/ErrorMessage'
import NoResult from 'shared/NoResult/NoResult'

interface Props {
  children: (result?: object[] | object) => JSX.Element
  // errorMessage: What to display, if the query fails?
  errorMessage?: string
  // query: grqphql query from store, like `GetCategories`
  query: DocumentNode
  // queryName: name of the actual query function, used inside of the provided query definition
  // like `getCategories`
  queryName: string
  // variables: If you need to run the query with specific variables
  variables?: object
  loadingPlaceholder?: JSX.Element
  ignoreEmptyResult?: boolean
}

const QueryStateHandler = (props: Props): JSX.Element => {
  const {
    children,
    errorMessage,
    ignoreEmptyResult,
    loadingPlaceholder,
    query,
    queryName,
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
        if (loading) {
          return loadingPlaceholder ? (
            loadingPlaceholder
          ) : (
            <LoadingSpinner hasDelay>
              <CenteredSpinner />
            </LoadingSpinner>
          )
        }
        if (error) {
          return <ErrorMessage error={error} message={errorMessage} />
        }
        if (
          (!ignoreEmptyResult && !data[queryName]) ||
          data[queryName].length === 0
        ) {
          return <NoResult />
        }
        return children(data[queryName])
      }}
    </Query>
  )
}
export default QueryStateHandler
