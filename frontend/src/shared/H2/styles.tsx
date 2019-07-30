// libraries
import styled from 'styled-components'
// components
import TextBig from 'shared/text/TextBig/TextBig'

export const Element = styled(TextBig)`
  margin: 0;

  font-size: ${(props): string => `${props.theme.fontSizes.mobile.big}rem`};
  hyphens: auto;
  text-overflow: ellipsis;
  overflow: hidden;

  height: ${(props): string => `${props.theme.fontSizes.mobile.big}rem`};
  line-height: ${(props): string => `${props.theme.fontSizes.mobile.big}rem`};

  @media (min-width: ${(props): string => props.theme.mediaQuery.tablet}) {
    height: ${(props): string => `${props.theme.fontSizes.tablet.big}rem`};
    line-height: ${(props): string => `${props.theme.fontSizes.tablet.big}rem`};
  }
`
