// libraries
import styled from 'styled-components'

export default styled.div`
  font-size: ${(props): number => props.theme.fontSizes.mobile.small}rem;

  @media (min-width: ${(props): string => props.theme.mediaQuery.tablet}) {
    font-size: ${(props): number => props.theme.fontSizes.tablet.small}rem;
  }
`
