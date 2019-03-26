import styled, { keyframes } from 'styled-components'

const countdown = keyframes`
  from {
    stroke-dashoffset: 0px;
  }
  to {
    stroke-dashoffset: 113px;
  }
`

export const Layout = styled.div`
  // The height/width needs to be set as min props
  min-height: 40px;
  min-width: 40px;

  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  text-align: center;

  cursor: pointer;
`

export const SvgWrapper = styled.svg`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  transform: rotateY(-180deg) rotateZ(-90deg);
`

interface SvgCircleProps {
  duration?: number
}

export const SvgCircle = styled.circle<SvgCircleProps>`
  stroke-dasharray: 113px;
  stroke-dashoffset: 0px;
  stroke-linecap: round;
  stroke-width: 2px;
  stroke: black;
  fill: none;
  animation: ${countdown} ${props => props.duration || '6'}s linear infinite
    forwards;
`
