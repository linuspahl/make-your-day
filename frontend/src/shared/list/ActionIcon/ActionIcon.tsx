// libraried
import React from 'react'
// components
import { Wrapper } from './styles'
import Icon from 'shared/Icon/Icon'

interface Props {
  ariaLabel: string
  icon: string
  to: string
}

const ActionIcon = (props: Props): JSX.Element => (
  <Wrapper to={props.to} aria-label={props.ariaLabel} data-testid="ActionIcon">
    <Icon title={props.icon} />
  </Wrapper>
)

export default ActionIcon
