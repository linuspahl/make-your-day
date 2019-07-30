// libraries
import styled from 'styled-components'

export default styled.div`
  font-size: ${(props): number => props.theme.fontSizes.mobile.large}rem;

  @media (min-width: ${(props): string => props.theme.mediaQuery.tablet}) {
    font-size: ${(props): number => props.theme.fontSizes.tablet.large}rem;
  }
`
