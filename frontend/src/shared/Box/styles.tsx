// libraries
import styled from 'styled-components'

export const Element = styled.div`
  border-radius: 0.125rem;

  background-color: ${(props): string => props.theme.contentBoxBg};
  box-shadow: ${(props): string => props.theme.boxShadow};
`
