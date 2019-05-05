// libraries
import * as React from 'react'
// components
import { Layout } from './styles'

export interface Props {
  children: React.ReactNode
  className?: string
  disabled?: boolean
  htmlFor?: string
  onClick?: () => {}
}

const Row = (props: Props): React.ReactElement => (
  <Layout
    disabled={props.disabled}
    className={props.className}
    htmlFor={props.htmlFor}
    onClick={props.onClick}
  >
    {props.children}
  </Layout>
)

export default Row
