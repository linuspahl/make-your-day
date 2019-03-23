// libraried
import * as React from 'react'
// components
import Icon from 'shared/Icon/Icon'
import { Element } from './styles'

interface Props {
  to: string,
  icon: string
}

const ActionIcon = (props: Props) => (
  <Element to={props.to}>
    <Icon title={props.icon} />
  </Element>
)
export default ActionIcon
