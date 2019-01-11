// libraries
import React from 'react'
import styled from 'styled-components'

const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: ${props => (props.spaceBetween ? 'space-between' : 'start')};

  min-height: 40px;

  border-top: 1px solid ${props => props.theme.border};
  padding: 0 10px;
  &:first-child {
    border-top: 0;
  }

  ${props =>
    props.clickable
      ? `
    &:active {
      background-color: ${props => props.theme.active};
    }
  `
      : ``}
`

export default props => {
  const clickable = props.onClick
  return (
    <ListItem
      onFocus={props.onFocus}
      tabIndex={props.tabIndex}
      clickable={clickable}
      onClick={props.onClick}
      spaceBetween={props.spaceBetween}
      className={props.className}
    >
      {props.children}
    </ListItem>
  )
}
