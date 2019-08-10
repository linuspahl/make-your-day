// libraries
import * as React from 'react'
// components
import { Layout, Spinner } from './styles'

const CenteredSpinner = (): JSX.Element => (
  <Layout data-testid="CenteredSpinner">
    <Spinner />
  </Layout>
)

export default CenteredSpinner
