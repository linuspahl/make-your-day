// libraries
import * as React from 'react'
import styled, { keyframes } from 'styled-components'

const shimmer = keyframes`
  0%{
    opacity: 0.5;
  }
  25%{
    opacity: 0.35;
  }
  50% {
    opacity: 0.7;
  }
  75% {
    opacity: 0.35;
  }
  100% {
    opacity: 0.5;
  }
`

const Element = styled.div`
  width: 100%;
  height: 100%;

  animation: ${shimmer} 3s infinite cubic-bezier(0.65, 0.05, 0.36, 1);
`

interface Props {
  children: React.ReactNode
}

const PlaceholderGroup = (props: Props): React.ReactElement => (
  <Element>{props.children}</Element>
)

export default PlaceholderGroup
