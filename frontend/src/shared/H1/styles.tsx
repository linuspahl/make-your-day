// libraries
import styled from 'styled-components'
// interfaces
interface ElementProps {
  context: string
}

export const Element = styled.h1<ElementProps>`
  font-family: 'Titillium Web', Arial, Helvetica, sans-serif;
  font-weight: 300;
  font-size: 32px;
  line-height: 1.15;
  text-align: center;
  hyphens: auto;
  ${(props): string =>
    props.context === 'page' &&
    `margin-bottom: ${props.theme.dimensions.padding * 4}px;`};

  @media (min-width: ${(props): string =>
      props.theme.mediaQuery.tablet}) and (orientation: landscape) {
    font-size: 42px;
  }
`
