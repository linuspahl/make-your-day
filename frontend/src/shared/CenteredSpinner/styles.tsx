// libraries
import styled, { keyframes } from 'styled-components'

const bounce = keyframes`
	0%, 100% {
		transform: scale(0.0);
		-webkit-transform: scale(0.0);
	} 50% {
		transform: scale(1.0);
		-webkit-transform: scale(1.0);
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
  width: 3.75rem;
  height: 3.75rem;

  position: relative;
  margin: 0 auto;
`

export const DoubleBouncer1 = styled.div`
  width: 100%;
  height: 100%;

  top: 0;
  left: 0;
  position: absolute;

  border-radius: 50%;
  background-color: ${(props): string => props.theme.border};
  opacity: 0.6;

  animation: ${bounce} 2s infinite ease-in-out;
`

export const DoubleBouncer2 = styled(DoubleBouncer1)`
  animation-delay: -1s;
`
