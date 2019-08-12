// libraries
import React from 'react'
// compoenents
import { Element } from './styles'

export interface Props {
  children: React.ReactNode
  className?: string
  clickAction?: (event: React.MouseEvent<HTMLElement>) => void
  onFocus?: () => void
  spaceBetween?: boolean
  tabIndex?: number
}

const ListItem = (props: Props): JSX.Element => {
  const clickable = typeof props.clickAction === 'function'
  return (
    <Element
      className={props.className}
      clickable={clickable}
      onClick={props.clickAction}
      onFocus={props.onFocus}
      spaceBetween={props.spaceBetween}
      tabIndex={props.tabIndex}
    >
      {props.children}
    </Element>
  )
}

export default ListItem
