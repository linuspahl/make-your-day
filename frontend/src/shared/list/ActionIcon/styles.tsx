// libraries
import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Element = styled(Link)`
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
