// libraries
import React from 'react'
import { Link } from 'react-router-dom'
// components
import { Layout } from './styles'

interface Props {
  children?: React.ReactNode
  clickAction?: () => void
  context?: 'primary' | 'secondary' | 'delete'
  tabIndex?: number
  to?: string
  type?: 'submit'
}

const Button = ({
  children,
  clickAction,
  context,
  to,
  type,
}: Props): JSX.Element => {
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
      onClick={(): void => hasClickAction && clickAction()}
    >
      {children}
    </Layout>
  )
}

export default Button
