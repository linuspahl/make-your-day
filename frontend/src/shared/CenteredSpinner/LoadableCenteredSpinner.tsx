// libraries
import React from 'react'
// components
import CenteredSpinner from './CenteredSpinner'

// The props are only needed, when the SpinnerComponen is used in the context of a dynamic route.
interface Props {
  pastDelay?: boolean
  error?: Error
  retry?: () => void
}

const LoadableCenteredSpinner = (props: Props): JSX.Element => {
  if (props.error) {
    return (
      <div>
        Error! <button onClick={props.retry}>Retry</button>
      </div>
    )
  } else if (props.pastDelay) {
    return <CenteredSpinner />
  }
  return null
}

export default LoadableCenteredSpinner
