// libraries
import React from 'react'
import { Link } from 'react-router-dom'
// components
import Icon from 'shared/Icon/Icon'
import { Category, CategoryTitle, IconWrapper } from './styles'
// interfaces
import { Category as CategoryType } from 'store/category/type'

interface Props {
  amount: number
  category: CategoryType
  displayTitle?: string
  to?: string
}

const CategorySummary = ({
  amount,
  category: { color, icon, hasUnit, unit, title },
  displayTitle,
  to,
}: Props): JSX.Element => {
  const isLink = Boolean(to)
  return (
    <Category
      color={color}
      // Button is a Link
      to={isLink ? to : null}
      as={isLink ? Link : null}
      data-testid="CategorySummary"
    >
      <IconWrapper>
        {icon && <Icon title={icon} />}
        {!icon && title && title.substring(0, 1)}
      </IconWrapper>
      {title !== displayTitle && <CategoryTitle>{displayTitle}</CategoryTitle>}
      {`${amount}${hasUnit ? unit : '×'}`}
    </Category>
  )
}

export default CategorySummary
