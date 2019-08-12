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

const FadeTransition = (props: Props): JSX.Element => {
  const duration = 500
  const delay = props.delay || 0
  return (
    <Transition in appear timeout={0} className="fadeTransition">
      {(state: 'entering' | 'entered' | 'exiting' | 'exited'): JSX.Element => {
        return (
          <Wrapper
            fullHeight={props.fullHeight}
            fullWidth={props.fullWidth}
            state={state}
            duration={duration}
            delay={delay}
          >
            {props.children}
          </Wrapper>
        )
      }}
    </Transition>
  )
}

export default FadeTransition
