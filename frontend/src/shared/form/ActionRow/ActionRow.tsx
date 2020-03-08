// libraries
import React from 'react'
// components
import { Layout } from './styles'

interface Props {
  children: React.ReactNode | React.ReactNodeArray
}

const ActionRow = ({ children }: Props): JSX.Element => {
  // Since the children are only an array, when there are multiple children,
  // we need to make use of React.Children.toArray
  const amountChildren = React.Children.toArray(children).length
  return <Layout amountChildren={amountChildren}>{children}</Layout>
}

export default ActionRow
