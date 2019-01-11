// libraries
import styled, { keyframes } from 'styled-components'
import { Link } from 'react-router-dom'

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

export const Layout = styled.div`
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;

  position: fixed;
  display: flex;
  align-items: center;

  padding: 20px;
  background-color: ${props => props.theme.appBg};

  z-index: 1;
  animation: ${fadeIn} 0.4s ease-out;
`

export const CloseIconWrapper = styled.div`
  top: 10px;
  right: 10px;

  position: fixed;

  &:active {
    background-color: ${props => props.theme.active};
  }
`

export const Pages = styled.ul`
  width: 100%;

  padding: 5px 10px;
  border: 1px solid ${props => props.theme.border};

  background-color: ${props => props.theme.contentBoxBg};
`
