// libraries
import * as React from 'react'
import { Layout, SvgWrapper, SvgCircle } from './styles'

interface Props {
  children: React.ReactNode
  clickAction?: () => void
}

const CircleTimer = (props: Props): JSX.Element => {
  const hasClickAction = typeof props.clickAction === 'function'
  return (
    <Layout
      onClick={(): void => hasClickAction && props.clickAction()}
      data-testid="CircleTimer"
    >
      {props.children}
      <SvgWrapper>
        <SvgCircle r="18" cx="20" cy="20" />
      </SvgWrapper>
    </Layout>
  )
}

export default CircleTimer
