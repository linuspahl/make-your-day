import styled, { keyframes } from 'styled-components'

const moveIn = keyframes`
  0% {
    transform: translateY(-100%);
  }

  100% {
    transform: translateY(0);
  }
`

const moveOut = keyframes`
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(-100%);
  }
`

export const Alert = styled.div`
  position: fixed;
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  border-radius: 0 0 5px 5px;
  padding: 10px 25px;

  background-color: ${props => {
    if (props.role === 'error') return '#ff6060'
    if (props.role === 'success') return '#9dff8d'
    return 'white'
  }};

  font-size: 20px;
  color: #000;

  animation: ${moveIn} ${props => props.durationAnimation}s,
    ${moveOut} ${props => props.durationAnimation}s linear
      ${props => props.durationVisible - props.durationAnimation}s;
`
