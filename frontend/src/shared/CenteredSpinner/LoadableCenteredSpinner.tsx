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

const LoadableCenteredSpinner = ({
  error,
  pastDelay,
  retry,
}: Props): JSX.Element => {
  if (error) {
    return (
      <div>
        Error! <button onClick={retry}>Retry</button>
      </div>
    )
  } else if (pastDelay) {
    return <CenteredSpinner />
  }
  return null
}

export default LoadableCenteredSpinner
