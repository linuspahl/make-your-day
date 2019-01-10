// libraries
import React from 'react'
// components
import { ListItem, InnerLink, RouteActive } from './styles'

export default props => {
  const {
    route: { title, path },
    activeRoute,
    toggleAction,
  } = props
  // Check if current route is active.
  // activeRoute allways represents the root part of a route.
  // In this case we also need to toggle the navigation manually
  // because the Navigation will not rerender
  const isActive = activeRoute === path
  return (
    <ListItem>
      <InnerLink to={path} onClick={() => toggleAction()}>
        {title} {isActive && <RouteActive />}
      </InnerLink>
    </ListItem>
  )
}
