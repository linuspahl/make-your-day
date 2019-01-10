// libraries
import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const ListItem = styled.li`
  width: 100%;
  height: 60px;
  border-bottom: 1px solid ${props => props.theme.border};

  &:active {
    background-color: ${props => props.theme.border};
  }
  &:last-child {
    border-bottom: 0;
  }
`

export const InnerLink = styled(Link)`
  width: 100%;
  height: 100%;

  padding: 0px 10px;

  display: flex;
  align-items: center;

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
