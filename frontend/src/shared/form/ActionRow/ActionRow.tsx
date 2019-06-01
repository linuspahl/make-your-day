// libraries
import * as React from 'react'
// components
import { Layout } from './styles'

interface Props {
  children: React.ReactNode | React.ReactNodeArray
}

const ActionRow = (props: Props): JSX.Element => {
  // Since the children are only an array, when there are multiple children,
  // we need to make use of React.Children.toArray
  const amountChildren = React.Children.toArray(props.children).length
  return <Layout amountChildren={amountChildren}>{props.children}</Layout>
}

export default ActionRow
