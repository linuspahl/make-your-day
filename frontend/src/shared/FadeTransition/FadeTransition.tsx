// libraries
import * as React from 'react'
import { Transition } from 'react-transition-group'
// components
import { Wrapper } from './styles'

interface Props {
  children: React.ReactNode
  fullHeight?: boolean
  fullWidth?: boolean
}

const FadeTransition = (props: Props): JSX.Element => {
  const duration = 500
  return (
    <Transition in appear timeout={10} className="fadeTransition">
      {(state: 'entering' | 'entered' | 'exiting' | 'exited'): JSX.Element => {
        return (
          <Wrapper
            fullHeight={props.fullHeight}
            fullWidth={props.fullWidth}
            state={state}
            duration={duration}
          >
            {props.children}
          </Wrapper>
        )
      }}
    </Transition>
  )
}

export default FadeTransition
