// libraries
import styled from 'styled-components'
// components
import Box from 'shared/Box/Box'

interface ElementProps {
  context?: 'page'
}

export const Element = styled(Box)<ElementProps>`
  width: 100%;
  max-width: ${(props): string =>
    `${props.context == 'page' ? '30rem' : '100%'}`};

  padding: ${(props): string => `${props.theme.padding}rem`};

  @media (min-width: ${(props): string => props.theme.mediaQuery.tablet}) {
    padding: ${(props): string =>
      `${props.theme.padding * 2}rem ${props.theme.padding * 2}rem`};
  }
`
