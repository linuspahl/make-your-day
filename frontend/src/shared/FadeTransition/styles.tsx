// libraries
import styled from 'styled-components'

interface WrapperProps {
  fullHeight?: boolean
  fullWidth?: boolean
  duration: number
  state: 'entering' | 'entered' | 'exiting' | 'exited'
}

export const Wrapper = styled.div<WrapperProps>`
  opacity: 0;
  will-change: opacity;
  transition: opacity ${(props): number => props.duration}ms ease-in;

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
