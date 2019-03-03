// libraries
import React from 'react'
import { Link } from 'react-router-dom'
// components
import Icon from 'shared/Icon/Icon'
import { Category, IconWrapper } from './styles'

const CategorySummary = props => {
  const {
    category: { color, icon, hasUnit, unit },
    amount,
    to,
  } = props
  const isLink = Boolean(to)
  return (
    <Category
      color={color}
      // Button is a Link
      to={isLink ? to : null}
      as={isLink ? Link : null}
    >
      <IconWrapper>
        <Icon title={icon} />
      </IconWrapper>
      {amount}
      {hasUnit ? unit : '×'}
    </Category>
  )
}

export default CategorySummary
