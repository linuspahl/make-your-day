// libraries
import React, { Component } from 'react'
import styled from 'styled-components'
import { logError } from 'utils/utils'

const Layout = styled.div`
  width: 100%;
  text-align: center;
`

const ErrorMessage = props => {
  const { error, message } = props
  if (error) logError(error)
  return <Layout>{message}</Layout>
}

export default ErrorMessage
