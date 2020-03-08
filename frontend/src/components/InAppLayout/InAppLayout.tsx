// libraries
import React, { useEffect, useState } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
// utils
import { getRootPath } from 'utils/utils'
// components
import { Layout, ChildrenWrapper } from './styles'
import Navigation from 'components/Navigation/Navigation'
import BottomNavigation from 'shared/BottomNavigation/BottomNavigation'
import CategoryIconOverview from 'components/CategoryIconOverview/CategoryIconOverview'
// interfaces
import { NavigationState } from 'types/types'
import { UserSession } from 'store/userSession/type'

interface Props extends RouteComponentProps {
  children: React.ReactNode
  userSession?: UserSession
}

interface State {
  navigationState: NavigationState
}

const InAppLayout = ({
  userSession,
  children,
  location: { pathname },
}: Props): JSX.Element => {
  const [navigationOpen, setNavigationOpen] = useState(false)
  const [animateNavOnClose, setAnimateNavOnClose] = useState(false)

  const toggleNavigation = (animateOnClose = true): void => {
    setAnimateNavOnClose(animateOnClose)
    setNavigationOpen(!navigationOpen)
  }

  const detectTouchstart = (event: TouchEvent): void => {
    // Detect when:
    // - user clicks with two fingers (mobile)
    if (event.type && event.touches.length === 2) {
      toggleNavigation()
    }
  }

  const detectKeydown = (event: KeyboardEvent): void => {
    // Detect when:
    // - or when the user click the alt key (desktop)
    if (event.keyCode === 18) {
      toggleNavigation()
    }
  }

  useEffect((): (() => void) => {
    document.addEventListener('touchstart', detectTouchstart)
    document.addEventListener('keydown', detectKeydown)

    return (): void => {
      document.removeEventListener('touchstart', detectTouchstart)
      document.removeEventListener('keydown', detectKeydown)
    }
  }, [])

  // If the route changes and the navigation is open, we want to close it
  useEffect((): void => {
    if (navigationOpen) {
      setNavigationOpen(true)
    }
  }, [location.pathname])

  const rootPath = getRootPath(pathname)

  return (
    <Layout>
      <ChildrenWrapper>{children}</ChildrenWrapper>

      <BottomNavigation
        isNavVisible={navigationOpen}
        toggleNavigation={toggleNavigation}
      >
        <CategoryIconOverview context="horizontal-scroll" />
      </BottomNavigation>

      {userSession && userSession.token && (
        <Navigation
          rootPath={rootPath}
          open={navigationOpen}
          animateOnClose={animateNavOnClose}
          toggleAction={toggleNavigation}
        />
      )}
    </Layout>
  )
}

export default withRouter(InAppLayout)
