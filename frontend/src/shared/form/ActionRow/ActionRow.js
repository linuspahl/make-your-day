import React from 'react'
import Row from 'shared/form/Row/Row'
import styled from 'styled-components'

const Layout = styled(Row)`
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

export default props => (
  <Layout amountChildren={props.children.length || 1}>{props.children}</Layout>
)
