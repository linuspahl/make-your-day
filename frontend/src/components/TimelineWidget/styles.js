// libraries
import styled from 'styled-components'

export const Outer = styled.div`
  display: flex;
  flex-direction: column-reverse;

  height: 100%;

  padding-top: 20px;

  overflow-y: auto;
`

export const FlexboxSpacer = styled.div`
  padding-top: 20px;
`

export const Layout = styled.div`
  width: 100%;

  border: 1px solid ${props => props.theme.border};
  background-color: ${props => props.theme.contentBoxBg};

  padding: 20px;

  &:before {
    height: 40px;
    display: block;
    background-color: grey;
    widht: 100%;
  }

  ::-webkit-scrollbar {
    display: none;
  }
`
