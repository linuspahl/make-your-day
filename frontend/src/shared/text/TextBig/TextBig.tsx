// libraries
import styled from 'styled-components'

export default styled.div`
  font-size: ${(props): string => `${props.theme.fontSizes.mobile.big}rem`};

  @media (min-width: ${(props): string => props.theme.mediaQuery.tablet}) {
    font-size: ${(props): string => `${props.theme.fontSizes.tablet.big}rem`};
  }
`
