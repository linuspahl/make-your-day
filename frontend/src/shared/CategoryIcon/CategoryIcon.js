// libraries
import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
// components
import Icon from 'shared/Icon/Icon'

const Circle = styled.div`
  height: 50px;
  width: 50px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin: 0 2px 0 2px;
  border-radius: 50%;

  background-color: ${props =>
    props.color ? props.theme.category[props.color] : props.theme.border};
  color: ${props => props.theme.categoryText[props.color]};
  font-size: 28px;
`

export default props => {
  const { icon, color, title, to } = props
  const isLink = Boolean(to)
  return (
    <Circle
      color={color}
      // CategoryIcon is a Link
      to={isLink ? to : null}
      as={isLink ? Link : null}
    >
      {icon && <Icon title={icon} />}
      {!icon && title && title.substring(0, 1)}
    </Circle>
  )
}
