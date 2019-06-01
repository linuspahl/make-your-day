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

const FadeTransition = (props: Props): JSX.Element => (
  <Transition in unmountOnExit timeout={0}>
    {(): JSX.Element => {
      return (
        <Wrapper fullHeight={props.fullHeight} fullWidth={props.fullWidth}>
          {props.children}
        </Wrapper>
      )
    }}
  </Transition>
)

export default FadeTransition
