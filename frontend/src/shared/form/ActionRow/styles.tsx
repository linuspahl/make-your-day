// libraries
import styled from 'styled-components'
// components
import Row from 'shared/form/Row/Row'

interface LayoutProps {
  amountChildren: number
}

export const Layout = styled(Row)<LayoutProps>`
  margin-top: ${(props): number => props.theme.dimensions.padding * 5}px;

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
`
