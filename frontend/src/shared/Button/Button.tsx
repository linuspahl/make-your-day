// libraries
import * as React from 'react'
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

const Button = (props: Props): React.ReactElement => {
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

export default Button
