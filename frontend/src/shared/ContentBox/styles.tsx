// libraries
import styled from 'styled-components'
// components
import Box from 'shared/Box/Box'

export const Element = styled(Box)`
  width: 100%;
  max-width: 30rem;

  padding: ${(props): string =>
    `${props.theme.padding * 1.5}rem ${props.theme.padding}rem`};

  @media (min-width: ${(props): string => props.theme.mediaQuery.tablet}) {
    padding: ${(props): string =>
      `${props.theme.padding * 2}rem ${props.theme.padding * 2}rem`};
  }
`
