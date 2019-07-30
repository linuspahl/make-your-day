// libraries
import styled from 'styled-components'
// components
import Row from 'shared/form/Row/Row'

interface LayoutProps {
  amountChildren: number
}

export const Layout = styled(Row)<LayoutProps>`
  margin-top: ${(props): string => `${props.theme.padding * 2}rem`};

  ${(props): string =>
    props.amountChildren === 1
      ? `
      justify-content: center
    `
      : ``};
  ${(props): string =>
    props.theme.settings.leftHandMode
      ? `
      flex-direction: row-reverse;
    `
      : ``}

  @media (min-width: ${(props): string => props.theme.mediaQuery.tablet}){
    margin-top: ${(props): string => `${props.theme.padding * 3}rem`};
  }
`
