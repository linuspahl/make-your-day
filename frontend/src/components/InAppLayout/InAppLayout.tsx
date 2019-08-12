// libraries
import React from 'react'
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

class InAppLayout extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props)

    this.state = {
      navigationState: { open: false, animateOnClose: true },
    }

    this.toggleNavigation = this.toggleNavigation.bind(this)
    this.detectTouchstart = this.detectTouchstart.bind(this)
    this.detectKeydown = this.detectKeydown.bind(this)
  }

  public componentDidMount(): void {
    document.addEventListener('touchstart', this.detectTouchstart)
    document.addEventListener('keydown', this.detectKeydown)
  }

  public componentWillUnmount(): void {
    document.removeEventListener('touchstart', this.detectTouchstart)
    document.removeEventListener('keydown', this.detectKeydown)
  }

  public componentWillReceiveProps(nextProps: Props): void {
    // If the route changes and the navigation is open, we want to close it
    if (this.state.navigationState.open) {
      if (nextProps.location.pathname !== this.props.location.pathname) {
        this.toggleNavigation(false)
      } else {
        this.toggleNavigation()
      }
    }
  }

  public render(): JSX.Element {
    const {
      userSession,
      children,
      location: { pathname },
    } = this.props
    const { navigationState } = this.state
    const rootPath = getRootPath(pathname)
    return (
      <Layout>
        <ChildrenWrapper>{children}</ChildrenWrapper>

        <BottomNavigation
          isNavVisible={navigationState.open}
          toggleNavigation={this.toggleNavigation}
        >
          <CategoryIconOverview context="horizontal-scroll" />
        </BottomNavigation>

        {userSession && userSession.token && (
          <Navigation
            rootPath={rootPath}
            state={navigationState}
            toggleAction={this.toggleNavigation}
          />
        )}
      </Layout>
    )
  }

  private toggleNavigation(animateOnClose = true): void {
    this.setState({
      navigationState: {
        animateOnClose,
        open: !this.state.navigationState.open,
      },
    })
  }

  private detectKeydown(event: KeyboardEvent): void {
    // Detect when:
    // - or when the user click the alt key (desktop)
    if (event.keyCode === 18) {
      this.toggleNavigation()
    }
  }

  private detectTouchstart(event: TouchEvent): void {
    // Detect when:
    // - user clicks with two fingers (mobile)
    if (event.type && event.touches.length === 2) {
      this.toggleNavigation()
    }
  }
}

export default withRouter(InAppLayout)
