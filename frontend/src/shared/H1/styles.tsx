// libraries
import styled from 'styled-components'
// components
import TextLarge from 'shared/text/TextLarge/TextLarge'
// interfaces
interface ElementProps {
  context: string
}

export const Element = styled(TextLarge)<ElementProps>`
  font-family: 'Titillium Web', Arial, Helvetica, sans-serif;
  font-weight: 300;
  text-align: center;
  hyphens: auto;

  ${(props): string =>
    props.context === 'page' &&
    `
      margin-bottom: ${props.theme.padding * 3}rem;
      
      @media (min-width: ${props.theme.mediaQuery.tablet}) {
        margin-bottom: ${props.theme.padding * 4}rem;
    `};
`
