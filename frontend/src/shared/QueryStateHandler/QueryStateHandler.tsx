// This component will be used for all overview components

// libraries
import * as React from 'react'
import { ApolloError, DocumentNode } from 'apollo-boost'
import { Query } from 'react-apollo'
// components
import CenteredSpinner from 'shared/CenteredSpinner/CenteredSpinner'
import ErrorMessage from 'shared/ErrorMessage/ErrorMessage'
import NoResult from 'shared/NoResult/NoResult'

interface Props {
  children: (result?: object[]) => JSX.Element
  errorMessage?: string
  query: DocumentNode
  queryName: string
  variables?: object
}

const QueryStateHandler = (props: Props): JSX.Element => {
  const { errorMessage, children, query, variables, queryName } = props

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
          return <CenteredSpinner />
        }
        if (error) {
          return <ErrorMessage error={error} message={errorMessage} />
        }
        if (data[queryName].length === 0) {
          return <NoResult />
        }
        return children(data[queryName])
      }}
    </Query>
  )
}
export default QueryStateHandler
