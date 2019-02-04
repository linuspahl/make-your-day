// libraries
import styled from 'styled-components'
// components
import ContentBox from 'shared/ContentBox/ContentBox'

export const Layout = styled.div`
  ${props => `
    padding: 10px;

    border-top: 1px solid ${props.theme.border};
    border-bottom: 1px solid ${props.theme.border};

    background-color: ${props.theme.contentBoxBg};
    overflow-x: auto;
    overflow-y: hidden;
    white-space:nowrap
  `}
`

export const IconWrapper = styled.div`
  display: inline-block;
  vertical-align: middle;
`
