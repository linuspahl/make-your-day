// libraries
import React from 'react'
import { Link } from 'react-router-dom'
// components
import Icon from 'shared/Icon/Icon'
import { Circle } from './styles'

interface Props {
  ariaLabel?: string
  color?: string
  icon?: string
  size?: number
  title: string
  to?: string
}

const CategoryIcon = (props: Props): JSX.Element => {
  const { ariaLabel, icon, color, title, to, size } = props
  const isLink = Boolean(to)
  return (
    <Circle
      size={size}
      color={color}
      // CategoryIcon is a Link
      to={isLink ? to : null}
      as={isLink ? Link : null}
      aria-label={ariaLabel || `Kategorieicon ${title}`}
      data-testid="CategoryIcon"
    >
      {icon && <Icon title={icon} />}
      {!icon && title && title.substring(0, 1)}
    </Circle>
  )
}

export default CategoryIcon
