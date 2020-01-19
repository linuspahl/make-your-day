// libraries
import React, { useEffect, useState } from 'react'
// components
import CenteredSpinner from 'shared/CenteredSpinner/CenteredSpinner'

interface Props {
  // dataTestId
  // - allows custom test id, so far only needed to test if a route renders the correct component
  // - only used when hasDelay is true
  dataTestId?: string
  // hasDelay - will add rendering delay to prevent content flashing
  hasDelay?: boolean
}

const LoadingSpinner = ({ hasDelay, dataTestId }: Props): JSX.Element => {
  const [delayFinished, setDelayFinished] = useState(false)
  const shouldRender = hasDelay ? delayFinished : true
  useEffect((): (() => void) => {
    const delayTimeout =
      hasDelay && window.setTimeout((): void => setDelayFinished(true), 20000)
    return (): void => hasDelay && clearTimeout(delayTimeout)
  }, [])

  if (shouldRender) {
    return <CenteredSpinner />
  }
  return <div data-testid={dataTestId} />
}

export default LoadingSpinner
