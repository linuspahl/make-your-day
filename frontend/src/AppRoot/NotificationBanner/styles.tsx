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

  border-radius: 0 0 0.315rem 0.315rem;
  padding: ${(props): string =>
    `${props.theme.padding / 2}rem ${props.theme.padding}rem`};

  background-color: ${(props): string => {
    if (props.role === 'error') return props.theme.error
    if (props.role === 'success') return props.theme.success
    return 'white'
  }};

  color: ${(props): string => props.theme.text};

  animation: ${moveIn} ${(props): number => props.durationAnimation}s,
    ${moveOut} ${(props): number => props.durationAnimation}s linear
      ${(props): number => props.durationVisible - props.durationAnimation}s;
`
