// libraries
import * as React from 'react'
// components
import Icon from 'shared/Icon/Icon'
// components
import { Element } from './styles'

interface Props {
  // closeAction is optional, because it component
  // gets wrapped in other elements
  closeAction?: () => void
}

const CloseIcon = (props: Props): React.ReactElement => {
  const hasClickAction = typeof props.closeAction === 'function'
  return (
    <Element onClick={() => hasClickAction && props.closeAction()}>
      <Icon title="times" />
    </Element>
  )
}

export default CloseIcon
