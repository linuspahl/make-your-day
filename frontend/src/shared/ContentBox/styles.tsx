// libraries
import styled from 'styled-components'

export const Element = styled.div`
  width: 100%;
  max-width: 420px;

  padding: 40px 20px 40px 20px;
  margin: auto;
  border-radius: 2px;

  box-shadow: ${props => props.theme.boxShadow};
  background-color: ${props => props.theme.contentBoxBg};
`
