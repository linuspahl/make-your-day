// libraries
import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
// utils
import { getRootPath } from 'utils/utils'
// components
import { Layout, ChildrenWrapper } from './styles'
import Navigation from 'components/Navigation/Navigation'
import BottomNavigation from 'shared/BottomNavigation/BottomNavigation'
import CategoryIconOverview from 'components/CategoryIconOverview/CategoryIconOverview'
// interfaces
import { NavigationState, NavigationStateChange } from 'types/types'
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
    document.addEventListener('touchstart', this.detectTouchstart, false)
    document.addEventListener('keydown', this.detectKeydown, false)
  }

  public componentWillUnmount(): void {
    document.removeEventListener('touchstart', this.detectTouchstart, false)
    document.removeEventListener('keydown', this.detectKeydown, false)
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
          toggleNavigation={(): void => {
            // We only want to animate the navigation close, when the route really changes
            // this looks smother in combination with the content fade effect
            this.toggleNavigation({
              animateOnClose: pathname !== '/dashboard',
            })
          }}
        >
          <CategoryIconOverview context="horizontal-scroll" />
        </BottomNavigation>

        {userSession && userSession.token && (
          <Navigation
            rootPath={rootPath}
            state={navigationState}
            toggleAction={this.toggleNavigation}
            fullPath={pathname}
          />
        )}
      </Layout>
    )
  }

  private toggleNavigation(newState: NavigationStateChange): void {
    const navigationState = this.state.navigationState
    this.setState({
      navigationState: {
        ...navigationState,
        ...newState,
        open: !navigationState.open,
      },
    })
  }

  private detectKeydown(event: KeyboardEvent): void {
    // Detect when:
    // - or when the user click the alt key (desktop)
    if (event.keyCode === 18) {
      this.toggleNavigation({ animateOnClose: true })
    }
  }

  private detectTouchstart(event: TouchEvent): void {
    // Detect when:
    // - user clicks with two fingers (mobile)
    if (event.type && event.touches.length === 2) {
      this.toggleNavigation({ animateOnClose: true })
    }
  }
}

export default withRouter(InAppLayout)
