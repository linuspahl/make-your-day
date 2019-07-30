// libraries
import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Element = styled(Link)`
  height: 2.5rem;
  width: 2.5rem;

  display: flex;
  justify-content: center;
  align-items: center;
  float: left;

  color: ${(props): string => props.theme.text};
  &:active {
    background-color: ${(props): string => props.theme.active};
  }
`
