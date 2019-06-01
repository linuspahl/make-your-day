// libraried
import * as React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
// components
import Icon from 'shared/Icon/Icon'

const Wrapper = styled(Link)`
  height: 40px;
  width: 40px;

  display: flex;
  justify-content: center;
  align-items: center;
  float: left;

  font-size: 26px;
  color: ${(props): string => props.theme.text};
  &:active {
    background-color: ${(props): string => props.theme.active};
  }
`

interface Props {
  ariaLabel: string
  icon: string
  to: string
}

const ActionIcon = (props: Props): JSX.Element => (
  <Wrapper to={props.to} aria-label={props.ariaLabel}>
    <Icon title={props.icon} />
  </Wrapper>
)
export default ActionIcon
