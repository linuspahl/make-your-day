// libraries
import styled, { keyframes } from 'styled-components'

const pulse = keyframes`
 0% {
    transform: scale(0);
    opacity: 0.9;
  }
  100% {
    transform: scale(1.2);
    opacity: 0;
  }
`

export const Layout = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`

export const Spinner = styled.div`
  height: 7rem;
  width: 7rem;

  border-radius: 50%;

  background: ${(props): string => `${props.theme.white}`};

  animation: ${pulse} 1.5s ease-out infinite;
  opacity: 0.7;

  &:after,
  &:before {
    background: ${(props): string => `${props.theme.primary}`};

    content: '';
    animation: ${pulse} 1.5s ease-out infinite;
  }

  &:after {
    height: 7rem;
    width: 7rem;

    display: block;

    border-radius: 50%;
  }
`
