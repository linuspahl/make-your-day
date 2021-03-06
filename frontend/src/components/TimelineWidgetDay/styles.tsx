// libraries
import styled from 'styled-components'

export const Shortcut = styled.div`
  min-height: ${(props): string => `${props.theme.padding * 2}rem`};
  min-width: ${(props): string => `${props.theme.padding * 2}rem`};

  display: flex;
  align-items: center;
  justify-content: center;

  margin-right: ${(props): string => `${props.theme.padding / 4}rem`};
  border: 0.0625rem solid ${(props): string => props.theme.border};
  border-radius: 50%;

  background-color: ${(props): string => props.theme.timelineDay};
`

export const Day = styled.button`
  width: 100%;

  display: flex;
  align-items: center;

  /* Remove default button styles */
  padding: ${(props): string => `${props.theme.padding / 4}rem 0`};
  border-bottom: 0.0625rem solid ${(props): string => props.theme.border};
  border-top: 0;
  border-left: 0;
  border-right: 0;

  background-color: transparent;

  cursor: pointer;

  &:last-child {
    border-bottom: 0;
  }
`

export const Categories = styled.div`
  display: flex;
  flex-flow: wrap;

  padding: ${(props): string => `${props.theme.padding / 4}rem`};
`
