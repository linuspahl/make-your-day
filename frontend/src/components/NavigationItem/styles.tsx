// libraries
import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const ListItem = styled.li`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  border-bottom: 0.0625rem solid ${(props): string => props.theme.border};

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

  padding: ${(props): string =>
    `${props.theme.padding / 1.5}rem ${props.theme.padding / 2}rem`};

  display: flex;
  align-items: center;
  justify-content: center;

  color: inherit;
  text-decoration: none;
`

export const RouteActive = styled.div`
  width: ${(props): string => `${props.theme.padding / 2}rem`};
  height: ${(props): string => `${props.theme.padding / 2}rem`};

  border-radius: 50%;
  margin-left: ${(props): string => `${props.theme.padding / 2}rem`};

  background-color: grey;
`
