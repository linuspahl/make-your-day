// libraries
import styled from 'styled-components'

export const Outer = styled.div`
  display: flex;
  flex-direction: column-reverse;

  height: 100%;

  border: 1px solid ${props => props.theme.border};
  background-color: ${props => props.theme.contentBoxBg};

  overflow-y: auto;
`

export const Layout = styled.div`
  width: 100%;

  padding: 20px;

  ::-webkit-scrollbar {
    display: none;
  }
`
