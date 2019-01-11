import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Icon from 'shared/Icon/Icon'

const Wrapper = styled(Link)`
  height: 40px;
  width: 40px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 26px;
  color: ${props => props.theme.text};
  &:active {
    background-color: ${props => props.theme.active};
  }
`

export default props => (
  <Wrapper to={props.to}>
    <Icon title="edit" />
  </Wrapper>
)
