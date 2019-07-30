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
  line-height: 1.15;
  text-align: center;
  hyphens: auto;

  ${(props): string =>
    props.context === 'page' &&
    `margin-bottom: ${props.theme.dimensions.padding * 4}px;`};
`
