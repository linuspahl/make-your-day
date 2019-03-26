// libraries
import * as React from 'react'
import { Link } from 'react-router-dom'
// components
import Icon from 'shared/Icon/Icon'
import { Category, IconWrapper } from './styles'
// interfaces
import { CategoryPlain } from 'store/category/type'

interface Props {
  amount: number,
  category: CategoryPlain,
  to?: string,
}

const CategorySummary = (props: Props) => {
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