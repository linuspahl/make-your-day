// libraries
import styled from 'styled-components'
// interfaces
interface Element {context: string }

export const Element = styled.h1<Element>`
  font-size: 28px;
  text-align: center;
  hyphens: auto;
  ${props => props.context === 'page' && 'margin-bottom: 60px;'};
`