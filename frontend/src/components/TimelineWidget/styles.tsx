// libraries
import styled from 'styled-components'

export const Outer = styled.div`
  display: flex;
  flex-direction: column-reverse;

  height: 100%;

  overflow-y: auto;
`

export const Layout = styled.div`
  width: 100%;

  padding: ${(props): number => props.theme.dimensions.padding}px;
  margin: auto 0;

  ::-webkit-scrollbar {
    display: none;
  }
`
