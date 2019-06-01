// libraries
import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

interface WrapperProps {
  fullHeight?: boolean
  fullWidth?: boolean
}

export const Wrapper = styled.div<WrapperProps>`
  animation: 0.35s ease-in 0s 1 ${fadeIn};
  ${(props): string => (props.fullHeight ? 'height: 100%;' : '')}
  ${(props): string => (props.fullWidth ? 'width: 100%;' : '')}
`
