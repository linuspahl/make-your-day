// libraries
import React from 'react'
import styled from 'styled-components'
// components
import Icon from 'shared/Icon/Icon'

const Element = styled.div`
  width: 40px;
  height: 40px;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 5px;

  font-size: 20px;
  cursor: pointer;

  &:active {
    background-color: ${props => props.theme.active};
  }
`

const CloseIcon = props => {
  const hasClickAction = typeof props.close === 'function'
  return (
    <Element onClick={() => hasClickAction && props.close()}>
      <Icon title="times" />
    </Element>
  )
}

export default CloseIcon
