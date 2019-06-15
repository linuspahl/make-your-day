// params
import { navigationItems } from 'params'
// libraries
import * as React from 'react'
import styled from 'styled-components'
// components
import Modal from 'shared/Modal/Modal'
import NavigationItem from 'components/NavigationItem/NavigationItem'

// We need o use a wrapping div for the Modal component
// To show the navigation above other currently open modals
const IndexLayer = styled.div`
  z-index: ${(props): string => props.theme.layerIndex.navigation};
`

interface Props {
  rootPath: string
  toggleAction: () => void
}

const Navigation = (props: Props): JSX.Element => {
  const { toggleAction, rootPath } = props

  return (
    <IndexLayer>
      <Modal headline="Menü" toggleAction={toggleAction}>
        <ul>
          {navigationItems.map(
            (route): JSX.Element => (
              <NavigationItem
                toggleAction={toggleAction}
                key={route.path}
                route={route}
                rootPath={rootPath}
              />
            )
          )}
        </ul>
      </Modal>
    </IndexLayer>
  )
}

export default Navigation
