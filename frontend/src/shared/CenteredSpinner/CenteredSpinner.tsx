// libraries
import * as React from 'react'
// components
import { Layout, Spinner, DoubleBouncer1, DoubleBouncer2 } from './styles'

interface Props {
  pastDelay?: boolean
  error?: string
  retry?: () => void
}

const CenteredSpinner = (props: Props): JSX.Element => {
  if (props.error) {
    return (
      <div>
        Error! <button onClick={props.retry}>Retry</button>
      </div>
    )
  } else if (props.pastDelay) {
    return (
      <Layout data-testid="CenteredSpinner">
        <Spinner>
          <DoubleBouncer1 />
          <DoubleBouncer2 />
        </Spinner>
      </Layout>
    )
  }
  return null
}

export default CenteredSpinner
