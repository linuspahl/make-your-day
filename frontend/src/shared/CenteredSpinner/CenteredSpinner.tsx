// libraries
import * as React from 'react'
// components
import { Layout, Spinner, DoubleBouncer1, DoubleBouncer2 } from './styles'

const CenteredSpinner = (): JSX.Element => (
  <Layout>
    <Spinner>
      <DoubleBouncer1 />
      <DoubleBouncer2 />
    </Spinner>
  </Layout>
)

export default CenteredSpinner
