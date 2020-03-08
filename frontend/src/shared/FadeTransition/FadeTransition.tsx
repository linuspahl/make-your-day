// libraries
import React from 'react'
import { Transition } from 'react-transition-group'
// components
import { Wrapper } from './styles'

interface Props {
  children: React.ReactNode
  fullHeight?: boolean
  fullWidth?: boolean
  delay?: number
}

const FadeTransition = ({
  children,
  fullHeight,
  fullWidth,
  delay = 0,
}: Props): JSX.Element => {
  const duration = 500
  return (
    <Transition in appear timeout={0} className="fadeTransition">
      {(state: 'entering' | 'entered' | 'exiting' | 'exited'): JSX.Element => {
        return (
          <Wrapper
            fullHeight={fullHeight}
            fullWidth={fullWidth}
            state={state}
            duration={duration}
            delay={delay}
          >
            {children}
          </Wrapper>
        )
      }}
    </Transition>
  )
}

export default FadeTransition
