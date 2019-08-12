import styled, { keyframes } from 'styled-components'

const countdown = keyframes`
  from {
    stroke-dashoffset: 0;
  }
  to {
    stroke-dashoffset: 7rem;
  }
`

export const Layout = styled.div`
  /* The height/width needs to be set as min props */
  min-height: 2.5rem;
  min-width: 2.5rem;

  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  text-align: center;

  cursor: pointer;
`

export const SvgWrapper = styled.svg`
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;

  position: absolute;

  transform: rotateY(-180deg) rotateZ(-90deg);
`

interface SvgCircleProps {
  duration?: number
}

export const SvgCircle = styled.circle<SvgCircleProps>`
  fill: none;

  stroke-dasharray: 7rem;
  stroke-dashoffset: 0;
  stroke-linecap: round;
  stroke-width: 0.125rem;
  stroke: black;
  animation: ${countdown} ${(props): number => props.duration || 6}s linear
    infinite forwards;
`
