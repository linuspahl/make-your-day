// libraries
import * as React from 'react'
// components
import { Layout } from './styles'
import Navigation from 'components/Navigation/Navigation'
// interfaces
import { UserSession } from 'store/userSession/type';

interface Props {
  children: React.ReactNode
  noPadding?: boolean
  rootPath: string
  userSession?: UserSession
}

interface State {
  isNavVisible: boolean
}

export default class PageLayout extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      isNavVisible: false,
    }

    this.toggleNavigation = this.toggleNavigation.bind(this)
    this.detectTouchstart = this.detectTouchstart.bind(this)
    this.detectKeydown = this.detectKeydown.bind(this)
  }

  componentDidMount() {
    document.addEventListener('touchstart', this.detectTouchstart, false)
    document.addEventListener('keydown', this.detectKeydown, false)
  }

  componentWillUnmount() {
    document.removeEventListener('touchstart', this.detectTouchstart, false)
    document.removeEventListener('keydown', this.detectKeydown, false)
  }

  render() {
    const { userSession, children, rootPath, noPadding } = this.props
    const { isNavVisible } = this.state

    return (
      <Layout noPadding={noPadding}>
        {userSession && isNavVisible && (
          <Navigation
            toggleAction={this.toggleNavigation}
            rootPath={rootPath}
          />
        )}
        {children}
      </Layout>
    )
  }

  toggleNavigation() {
    const isNavVisible = this.state.isNavVisible

    this.setState({
      isNavVisible: !isNavVisible,
    })
  }

  detectKeydown(event: KeyboardEvent) {
    // Detect when:
    // - or when the user click the alt key (desktop)
    if (event.keyCode === 18) {
      this.toggleNavigation()
    }
  }

  detectTouchstart(event: TouchEvent) {
    // Detect when:
    // - user clicks with two fingers (mobile)
    if (event.type && event.touches.length === 2) {
      this.toggleNavigation()
    }
  }
}
