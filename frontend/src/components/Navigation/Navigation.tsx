// libraries
import * as React from 'react'
// components
import Modal from 'shared/Modal/Modal'
import NavigationItem from 'components/NavigationItem/NavigationItem'

interface Props {
  rootPath: string
  toggleAction: () => void
}

const Navigation = (props: Props) => {
  const { toggleAction, rootPath } = props
  const items = [
    { path: '/', title: 'Dashboard' },
    { path: '/categories', title: 'Kategorien verwalten' },
    { path: '/widgets', title: 'Widgets verwalten' },
    { path: '/evaluations', title: 'Auswertungen verwalten' },
    { path: '/settings', title: 'Einstellungen' },
  ]

  return (
    <Modal headline="Menü" toggleAction={toggleAction}>
      <ul>
        {items.map(route => (
          <NavigationItem
            toggleAction={toggleAction}
            key={route.path}
            route={route}
            rootPath={rootPath}
          />
        ))}
      </ul>
    </Modal>
  )
}

export default Navigation
