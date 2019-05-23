// libraries
import styled from 'styled-components'

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

export const Day = styled.button`
  width: 100%;

  display: flex;
  align-items: center;
  cursor: pointer;

  padding: 5px 0;
  border-bottom: 1px solid ${props => props.theme.border};

  // Remove default button styles
  border-top: 0;
  border-left: 0;
  border-right: 0;
  background-color: transparent;

  &:last-child {
    border-bottom: 0;
  }
`

export const Categories = styled.div`
  display: flex;
  flex-flow: wrap;

  padding: 5px;
`
