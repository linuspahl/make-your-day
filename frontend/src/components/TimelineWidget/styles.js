// libraries
import styled from 'styled-components'

export const Layout = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column-reverse;
  justify-content: center;

  padding: 20px;
  border: 1px solid ${props => props.theme.border};

  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`
