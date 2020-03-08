// libraries
import React from 'react'
// components
import { Layout } from './styles'

export interface Props {
  children: React.ReactNode
  className?: string
  disabled?: boolean
  htmlFor?: string
  onClick?: () => void
}

const Row = ({
  children,
  className,
  disabled,
  htmlFor,
  onClick,
}: Props): JSX.Element => (
  <Layout
    className={className}
    data-testid="Row"
    disabled={disabled}
    htmlFor={htmlFor}
    onClick={onClick}
    as={htmlFor ? 'label' : 'div'}
  >
    {children}
  </Layout>
)

export default Row
