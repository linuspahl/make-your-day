// libraries
import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Layout = styled.button`
  ${props => {
    let bgColor = `#fff`
    let activeBgColor = `#efefef`
    if (props.context === 'primary') {
      bgColor = props.theme.primary
      activeBgColor = props.theme.primaryActive
    }
    if (props.context === 'secondary') {
      bgColor = props.theme.secondary
      activeBgColor = props.theme.secondaryActive
    }

    return `
      height: 40px;
      padding: 10px 20px;

      background-color: ${bgColor};
      border: 1px solid ${props.theme.border};
      color: ${props.theme.text};
      cursor: pointer;

      &:active {
        background-color: ${activeBgColor};
      };

      &:focus {
        outline: none;
      };

    `
  }}
`

export default props => {
  const { clickAction, children, type, context, to } = props
  const hasClickAction = typeof clickAction === 'function'
  const isLink = Boolean(to)

  return (
    <Layout
      type={type || 'button'}
      context={context}
      // Button is a Link
      to={isLink ? to : null}
      as={isLink ? Link : null}
      // Button is clickable
      onClick={() => hasClickAction && clickAction()}
    >
      {children}
    </Layout>
  )
}
