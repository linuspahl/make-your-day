// libraries
import * as React from 'react'
import { Link } from 'react-router-dom'
// components
import Icon from 'shared/Icon/Icon'
import { Category, CategoryTitle, IconWrapper } from './styles'
// interfaces
import { CategoryPlain } from 'store/category/type'

interface Props {
  amount: number
  category: CategoryPlain
  displayTitle?: string
  to?: string
}

const CategorySummary = (props: Props): JSX.Element => {
  const {
    category: { color, icon, hasUnit, unit, title },
    displayTitle,
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
        {icon && <Icon title={icon} />}
        {!icon && title && title.substring(0, 1)}
      </IconWrapper>
      {title !== displayTitle && <CategoryTitle>{displayTitle}</CategoryTitle>}
      {amount}
      {hasUnit ? unit : '×'}
    </Category>
  )
}

export default CategorySummary
