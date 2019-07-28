// libraries
import styled from 'styled-components'

export const Element = styled.h2`
  margin: 0;

  font-size: 22px;
  hyphens: auto;
  text-overflow: ellipsis;
  overflow: hidden;

  @media (min-width: ${(props): string =>
      props.theme.mediaQuery.tablet}) and (orientation: landscape) {
    font-size: 28px;
  }
`
