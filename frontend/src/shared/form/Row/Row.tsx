// libraries
import * as React from 'react'
// components
import { Layout } from './styles'

export interface Props {
  children: React.ReactNode
  className?: string
  disabled?: boolean
  htmlFor?: string
  onClick?: () => void
}

const Row = (props: Props): JSX.Element => (
  <Layout
    className={props.className}
    data-testid="Row"
    disabled={props.disabled}
    htmlFor={props.htmlFor}
    onClick={props.onClick}
  >
    {props.children}
  </Layout>
)

export default Row
