// libraries
import React from 'react'
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

interface ElementProps {
  verticalCenter?: boolean
}

const Element = styled.div<ElementProps>`
  width: 100%;
  height: 100%;

  animation: ${shimmer} 3s infinite cubic-bezier(0.65, 0.05, 0.36, 1);

  ${(props): string => {
    if (props.verticalCenter)
      return `
      display: flex;
      align-items: center;
    `
  }}
`

interface Props {
  children: React.ReactNode
  verticalCenter?: boolean
}

const PlaceholderGroup = (props: Props): JSX.Element => (
  <Element verticalCenter={props.verticalCenter}>{props.children}</Element>
)

export default PlaceholderGroup
