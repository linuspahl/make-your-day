// libraries
import styled from 'styled-components'

export const Element = styled.div`
  width: 40px;
  height: 40px;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 5px;

  font-size: 20px;
  cursor: pointer;

  &:active {
    background-color: ${(props): string => props.theme.active};
  }
`
