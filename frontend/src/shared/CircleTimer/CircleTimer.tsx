// libraries
import React from 'react'
import { Layout, SvgWrapper, SvgCircle } from './styles'

interface Props {
  children: React.ReactNode
  clickAction?: () => void
}

const CircleTimer = ({ children, clickAction }: Props): JSX.Element => {
  const hasClickAction = typeof clickAction === 'function'
  return (
    <Layout
      onClick={(): void => hasClickAction && clickAction()}
      data-testid="CircleTimer"
    >
      {children}
      <SvgWrapper>
        <SvgCircle r="18" cx="20" cy="20" />
      </SvgWrapper>
    </Layout>
  )
}

export default CircleTimer
