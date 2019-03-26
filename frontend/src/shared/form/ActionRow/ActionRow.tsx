// libraries
import * as React from 'react'
// components
import { Layout } from './styles'

interface Props {
  children: React.ReactNode | React.ReactNodeArray
}

const ActionRow = (props: Props) => {
  return <Layout amountChildren={2}>{props.children}</Layout>}

export default ActionRow
