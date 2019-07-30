// libraries
import styled, { keyframes } from 'styled-components'
// interfaces
import { Notification } from 'types/types'
// components
import TextBig from 'shared/text/TextBig/TextBig'

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

interface AlertProps {
  durationAnimation: number
  durationVisible: number
  role: Notification['type']
}

export const Alert = styled(TextBig)<AlertProps>`
  width: 100%;

  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: ${(props): string => props.theme.layerIndex.notificationBanner};

  border-radius: 0 0 5px 5px;
  padding: 10px 20px;

  background-color: ${(props): string => {
    if (props.role === 'error') return '#ff6060'
    if (props.role === 'success') return '#9dff8d'
    return 'white'
  }};

  color: #000;

  animation: ${moveIn} ${(props): number => props.durationAnimation}s,
    ${moveOut} ${(props): number => props.durationAnimation}s linear
      ${(props): number => props.durationVisible - props.durationAnimation}s;
`
