// libraries
import styled from 'styled-components'
// components
import TextBig from 'shared/text/TextBig/TextBig'

export const Element = styled(TextBig)`
  margin: 0;

  font-size: ${(props): number => props.theme.fontSizes.mobile.big}rem;
  hyphens: auto;
  text-overflow: ellipsis;
  overflow: hidden;
`
