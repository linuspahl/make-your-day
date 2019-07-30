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

  color: ${(props): string => props.theme.text};
  &:active {
    background-color: ${(props): string => props.theme.active};
  }
`
