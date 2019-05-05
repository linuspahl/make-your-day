// libraries
import * as React from 'react'
// compoenents
import { ListItem } from './styles'

export interface Props {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  onFocus?: () => void
  spaceBetween?: boolean
  tabIndex?: number
}

const LogoutIcon = (props: Props): React.ReactElement => {
  const clickable = typeof props.onClick === 'function'
  return (
    <ListItem
      className={props.className}
      clickable={clickable}
      onClick={props.onClick}
      onFocus={props.onFocus}
      spaceBetween={props.spaceBetween}
      tabIndex={props.tabIndex}
    >
      {props.children}
    </ListItem>
  )
}

export default LogoutIcon
