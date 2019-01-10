// libraries
import React from 'react'
import styled from 'styled-components'
// components
import Icon from 'shared/Icon/Icon'

const CloseIcon = styled.div`
  width: 30px;
  height: 30px;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 5px;

  font-size: 20px;
`

export default props => {
  const hasClickAction = typeof props.close === 'function'
  return (
    <CloseIcon onClick={() => hasClickAction && props.close()}>
      <Icon title="times" />
    </CloseIcon>
  )
}
