// libraries
import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
// components
import Icon from 'shared/Icon/Icon'

const Category = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 3px 8px;
  margin: 2px 4px 2px 0;
  border-radius: 20px;
  border: 1px solid ${props => props.theme.border};

  background-color: ${props =>
    props.color ? props.theme.category[props.color] : props.theme.border};
  color: ${props => props.theme.categoryText[props.color]};
  font-size: 12px;

  &:last-child {
    margin-right: 0;
  }
`

const IconWrapper = styled.div`
  font-size: 16px;
  margin-right: 4px;
`

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
