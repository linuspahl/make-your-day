// libraries
import styled from 'styled-components'

export const Element = styled.div`
  border-radius: 2px;
  box-shadow: ${props => props.theme.boxShadow};
  background-color: ${props => props.theme.contentBoxBg};
`
