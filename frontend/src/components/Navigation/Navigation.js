// libraries
import React from 'react'
import { withRouter } from 'react-router-dom'
// components
import CloseIcon from 'shared/CloseIcon/CloseIcon'
import NavigationItem from 'components/NavigationItem/NavigationItem'
import { CloseIconWrapper, Layout, Pages, RouteActive } from './styles'

export default props => {
  const { toggleAction, rootPath } = props
  const items = [
    { path: '/', title: 'Dashboard' },
    { path: '/categories', title: 'Kategorien verwalten' },
    { path: '/widgets', title: 'Widgets verwalten' },
    { path: '/settings', title: 'Einstellungen' },
  ]

  return (
    <Layout>
      <CloseIconWrapper>
        <CloseIcon close={toggleAction} />
      </CloseIconWrapper>
      <Pages>
        {items.map(route => (
          <NavigationItem
            toggleAction={toggleAction}
            key={route.path}
            route={route}
            rootPath={rootPath}
          />
        ))}
      </Pages>
    </Layout>
  )
}
