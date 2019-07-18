// libraries
import * as React from 'react'
// components
import CenteredSpinner from 'shared/CenteredSpinner/CenteredSpinner'

interface Props {
  hasDelay?: boolean // will add rendering delay to prevent content flashing
}

interface State {
  delayFinished: boolean
}

const LoadingSpinner = class LoadingSpinner extends React.Component<
  Props,
  State
> {
  private delayTimeout?: number

  public constructor(props: Props) {
    super(props)
    this.state = {
      delayFinished: false,
    }
    this.delayTimeout = 0
  }

  public componentDidMount(): void {
    this.delayTimeout = window.setTimeout((): void => {
      this.setState({
        delayFinished: true,
      })
    }, 200)
  }

  public componentWillUnmount(): void {
    if (this.delayTimeout) {
      clearTimeout(this.delayTimeout)
      this.delayTimeout = 0
    }
  }

  public render(): JSX.Element {
    const { hasDelay } = this.props
    const { delayFinished } = this.state
    const shouldRender = hasDelay ? delayFinished : true

    if (shouldRender) {
      return <CenteredSpinner />
    }
    return <div />
  }
}

export default LoadingSpinner
