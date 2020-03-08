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

const ListItem = ({
  children,
  className,
  clickAction,
  onFocus,
  spaceBetween,
  tabIndex,
}: Props): JSX.Element => (
  <Element
    className={className}
    clickable={typeof clickAction === 'function'}
    onClick={clickAction}
    onFocus={onFocus}
    spaceBetween={spaceBetween}
    tabIndex={tabIndex}
  >
    {children}
  </Element>
)

export default ListItem
