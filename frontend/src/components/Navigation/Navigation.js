// libraries
import React from 'react'
// components
import { CloseIconWrapper, Layout, Pages } from './styles'
import CloseIcon from 'shared/CloseIcon/CloseIcon'
import FadeTransition from 'shared/FadeTransition/FadeTransition'
import NavigationItem from 'components/NavigationItem/NavigationItem'

const Navigation = props => {
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
        <FadeTransition>
          {items.map(route => (
            <NavigationItem
              toggleAction={toggleAction}
              key={route.path}
              route={route}
              rootPath={rootPath}
            />
          ))}
        </FadeTransition>
      </Pages>
    </Layout>
  )
}

export default Navigation
