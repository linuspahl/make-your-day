// libraries
import React from 'react'
import { logError } from 'utils/utils'
import { ApolloError } from 'apollo-boost'
// components
import { Layout } from './styles'

interface Props {
  error: ApolloError | string
  message: string
}

const ErrorMessage = ({ error, message }: Props): JSX.Element => {
  if (error) logError(error)
  return <Layout>{message}</Layout>
}

export default ErrorMessage
