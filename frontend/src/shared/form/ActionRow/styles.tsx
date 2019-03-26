// libraries
import Row from 'shared/form/Row/Row'
import styled from 'styled-components'

interface LayoutProps {
  amountChildren: number
}

export const Layout = styled(Row)<LayoutProps>`
  margin-top: 40px;
  ${props =>
    props.amountChildren === 1
      ? `
      justify-content: center
    `
      : ``};
  ${props =>
    props.theme.settings.leftHandMode
      ? `
      flex-direction: row-reverse;
    `
      : ``}
`