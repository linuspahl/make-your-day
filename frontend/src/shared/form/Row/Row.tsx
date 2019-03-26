// libraries
import * as React from 'react'
// components
import { Layout } from './styles'

interface Props {
  as?: any
  children: any
  className?: string
  disabled?: boolean
  htmlFor?: string
  onClick?: () => {}
}

const Row = (props: Props) => (
  <Layout
    disabled={props.disabled}
    className={props.className}
    as={props.as}
    htmlFor={props.htmlFor}
    onClick={props.onClick}
  >
    {props.children}
  </Layout>
)

export default Row
