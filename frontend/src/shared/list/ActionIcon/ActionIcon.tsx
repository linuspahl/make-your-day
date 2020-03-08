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

const ActionIcon = ({ ariaLabel, to, icon }: Props): JSX.Element => (
  <Wrapper to={to} aria-label={ariaLabel} data-testid="ActionIcon">
    <Icon title={icon} />
  </Wrapper>
)

export default ActionIcon
