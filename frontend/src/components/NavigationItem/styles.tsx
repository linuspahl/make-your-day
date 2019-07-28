// libraries
import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const ListItem = styled.li`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  border-bottom: 1px solid ${(props): string => props.theme.border};

  color: inherit;
  text-decoration: none;

  cursor: pointer;

  &:active {
    background-color: ${(props): string => props.theme.active};
  }
  &:last-child {
    border-bottom: 0;
  }
`

export const InnerLink = styled(Link)`
  width: 100%;
  height: 100%;

  padding: ${(props): string => props.theme.dimensions.padding}px 10px;

  display: flex;
  align-items: center;
  justify-content: center;

  color: inherit;
  text-decoration: none;
`

export const RouteActive = styled.div`
  width: 8px;
  height: 8px;

  border-radius: 50%;
  margin-left: 10px;

  background-color: grey;
`
