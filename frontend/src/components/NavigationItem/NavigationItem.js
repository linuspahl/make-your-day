// libraries
import React from 'react'
// components
import { ListItem, InnerLink, RouteActive } from './styles'

export default props => {
  const {
    route: { title, path },
    activeRoute,
  } = props
  // Check if current route is active
  // activeRoute allways represents the root part of a route
  const isActive = activeRoute === path
  return (
    <ListItem>
      <InnerLink to={path}>
        {title} {isActive && <RouteActive />}
      </InnerLink>
    </ListItem>
  )
}
