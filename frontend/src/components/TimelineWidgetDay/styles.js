// libraries
import styled from 'styled-components'
// components
import { Link } from 'react-router-dom'

export const Shortcut = styled.div`
  min-height: 40px;
  min-width: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-right: 5px;

  border-radius: 50%;
  border: 1px solid ${props => props.theme.border};

  background-color: ${props => props.theme.timelineDay};
`

export const Day = styled(Link)`
  width: 100%;

  display: flex;
  align-items: center;

  padding: 5px 0;
  border-top: 1px solid ${props => props.theme.border};

  &:last-child {
    border-top: 0;
  }
`

export const Categories = styled.div`
  display: flex;
  flex-flow: wrap;

  padding: 5px;
`
