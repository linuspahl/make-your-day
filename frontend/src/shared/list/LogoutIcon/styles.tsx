// libraries

import styled from 'styled-components'

export const Wrapper = styled.div`
  height: 40px;
  width: 40px;

  display: flex;
  justify-content: center;
  align-items: center;
  float: left;

  font-size: 26px;
  color: ${props => props.theme.text};
  cursor: pointer;

  &:active {
    background-color: ${props => props.theme.active};
  }
`
