// libraries
import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
// components
import Icon from 'shared/Icon/Icon'

const Circle = styled.div`
  min-height: ${props => props.size || 50}px;
  min-width: ${props => props.size || 50}px;

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid ${props => props.theme.border};

  background-color: ${props =>
    props.color ? props.theme.category[props.color] : props.theme.border};
  color: ${props => props.theme.categoryText[props.color]};
  font-size: ${props => props.size / 2 || 28}px;
`

const CategoryIcon = props => {
  const { icon, color, title, to, size } = props
  const isLink = Boolean(to)
  return (
    <Circle
      size={size}
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

export default CategoryIcon
