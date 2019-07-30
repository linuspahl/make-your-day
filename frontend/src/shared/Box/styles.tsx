// libraries
import styled from 'styled-components'

export const Element = styled.div`
  border-radius: 0.125rem;
  box-shadow: ${(props): string => props.theme.boxShadow};
  background-color: ${(props): string => props.theme.contentBoxBg};
`
