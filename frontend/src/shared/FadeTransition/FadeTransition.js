// libraries
import React from 'react'
import { Transition } from 'react-transition-group'
import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

export const Wrapper = styled.div`
  animation: 0.35s ease-in 0s 1 ${fadeIn};
  ${props => (props.fullHeight ? 'height: 100%;' : '')}
  ${props => (props.fullWidth ? 'width: 100%;' : '')}
`

export default ({ children, fullHeight, fullWidth }) => (
  <Transition in unmountOnExit timeout={0}>
    {status => {
      return (
        <Wrapper status={status} fullHeight={fullHeight} fullWidth={fullWidth}>
          {children}
        </Wrapper>
      )
    }}
  </Transition>
)
