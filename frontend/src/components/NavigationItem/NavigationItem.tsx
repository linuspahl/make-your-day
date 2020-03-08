// libraries
import React from 'react'
// components
import { ListItem, InnerLink, RouteActive } from './styles'

interface Props {
  rootPath: string
  route: { title: string; path: string }
}

const NavigationItem = ({
  route: { title, path },
  rootPath,
}: Props): JSX.Element => {
  // Check if current route is active.
  // rootPath allways represents the root part of a route.
  // In this case we also need to toggle the navigation manually
  // because the Navigation will not rerender
  const isActive = rootPath === path
  return (
    <ListItem>
      <InnerLink to={path}>
        {title} {isActive && <RouteActive />}
      </InnerLink>
    </ListItem>
  )
}

export default NavigationItem
