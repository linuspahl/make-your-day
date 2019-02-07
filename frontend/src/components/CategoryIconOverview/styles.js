// libraries
import styled from 'styled-components'

export const Layout = styled.div`
  padding: 10px 0 5px 0;
  ${props =>
    props.context === 'horizontal-scroll'
      ? `
      padding: 10px 20px;

      border-top: 1px solid ${props.theme.border};
      border-bottom: 1px solid ${props.theme.border};

      background-color: ${props.theme.contentBoxBg};
      overflow-x: auto;
      overflow-y: hidden;
      white-space: nowrap;
    `
      : ''}
`

export const IconWrapper = styled.div`
  display: inline-block;
  vertical-align: middle;

  margin-right: 10px;

  &:last-child {
    margin-right: 0;
  }

  ${props =>
    props.context !== 'horizontal-scroll'
      ? `
        margin-bottom: 5px;`
      : ``}
`
