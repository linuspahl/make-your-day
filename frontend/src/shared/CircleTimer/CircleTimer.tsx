// libraries
import * as React from 'react'
import { Layout, SvgWrapper, SvgCircle } from './styles'

interface Props {
  children: React.ReactNode
  clickAction?: () => void
}

const CircleTimer = (props: Props): React.ReactElement => {
  const hasClickAction = typeof props.clickAction === 'function'
  return (
    <Layout onClick={() => hasClickAction && props.clickAction()}>
      {props.children}
      <SvgWrapper>
        <SvgCircle r="18" cx="20" cy="20" />
      </SvgWrapper>
    </Layout>
  )
}

export default CircleTimer
