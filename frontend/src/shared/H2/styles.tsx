// libraries
import styled from 'styled-components'
// components
import TextBig from 'shared/text/TextBig/TextBig'

export const Element = styled(TextBig)`
  margin: 0;

  font-family: 'Titillium Web', Arial, Helvetica, sans-serif;
  font-size: ${(props): string => `${props.theme.fontSizes.mobile.big}rem`};
  font-weight: 300;
  hyphens: auto;
  text-overflow: ellipsis;
  overflow: hidden;

  height: ${(props): string => `${props.theme.fontSizes.mobile.big}rem`};

  @media (min-width: ${(props): string => props.theme.mediaQuery.tablet}) {
    height: ${(props): string => `${props.theme.fontSizes.tablet.big}rem`};
  }
`
