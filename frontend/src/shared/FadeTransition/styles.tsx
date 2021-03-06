// libraries
import styled from 'styled-components'

interface WrapperProps {
  fullHeight?: boolean
  fullWidth?: boolean
  duration: number
  delay: number
  state: 'entering' | 'entered' | 'exiting' | 'exited'
}

export const Wrapper = styled.div<WrapperProps>`
  will-change: opacity;
  transition: opacity ${(props): number => props.duration}ms ease-in;
  transition-delay: ${(props): number => props.delay}ms;

  opacity: 0;
  
  ${(props): string => {
    switch (props.state) {
      case 'entered':
        return `
          opacity: 1;
          will-change: auto;
        `
      default:
        return ''
    }
  }}

  ${(props): string => (props.fullHeight ? 'height: 100%;' : '')}
  ${(props): string => (props.fullWidth ? 'width: 100%;' : '')}
`
