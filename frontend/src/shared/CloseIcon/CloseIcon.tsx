// libraries
import React from 'react'
// components
import Icon from 'shared/Icon/Icon'
// components
import { Element } from './styles'

interface Props {
  // closeAction is optional, because it component
  // gets wrapped in other elements
  closeAction?: (event: React.MouseEvent<HTMLElement>) => void
}

const CloseIcon = (props: Props): JSX.Element => {
  const hasClickAction = typeof props.closeAction === 'function'
  return (
    <Element
      onClick={(event: React.MouseEvent<HTMLElement>): void =>
        hasClickAction && props.closeAction(event)
      }
      data-testid="CloseIcon"
    >
      <Icon title="times" />
    </Element>
  )
}

export default CloseIcon
