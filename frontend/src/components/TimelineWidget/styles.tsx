// libraries
import styled from 'styled-components'

export const Outer = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column-reverse;

  overflow-y: auto;

  ::-webkit-scrollbar {
    display: none;
  }
`

export const Layout = styled.div`
  width: 100%;

  padding: ${(props): string => `${props.theme.padding}rem`};
  margin: auto 0;
`
