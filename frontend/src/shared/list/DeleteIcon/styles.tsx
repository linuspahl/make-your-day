import styled from 'styled-components'

export const Element = styled.div`
  height: 40px;
  width: 40px;

  display: flex;
  justify-content: center;
  align-items: center;
  float: left;

  font-size: 26px;
  color: ${(props): string => props.theme.text};
  &:active {
    background-color: ${(props): string => props.theme.active};
  }
`
