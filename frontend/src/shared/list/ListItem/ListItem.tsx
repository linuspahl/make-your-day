// libraries
import * as React from 'react'
// compoenents
import { ListItem } from './styles'

interface Props {
  onFocus?: () => void
  tabIndex: number
  onClick?: () => void
  spaceBetween?: 'space-between' | 'start'
  className?: string
  children: string
}

const LogoutIcon = (props: Props) => {
  const clickable = typeof props.onClick === 'function'
  return (
    <ListItem
      onFocus={props.onFocus}
      tabIndex={props.tabIndex}
      clickable={clickable}
      onClick={props.onClick}
      spaceBetween={props.spaceBetween}
      className={props.className}
    >
      {props.children}
    </ListItem>
  )
}

export default LogoutIcon
