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
      display: flex;
      align-items: center;

      height: 40px;
      padding: 0 20px;
      border: 0;

      background-color: ${bgColor};
      color: ${props.theme.text};
      cursor: pointer;

      &:active, &:focus {
        background-color: ${activeBgColor};
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
