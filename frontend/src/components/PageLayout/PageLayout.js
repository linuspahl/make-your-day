// libraries
import React from 'react'
import styled from 'styled-components'
import Navigation from 'components/Navigation/Navigation'

const Layout = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;

  padding: ${props => (props.noPadding ? 0 : '20px')};

  background-color: ${props => props.theme.appBg};

  color: ${props => props.theme.text};
`

export default class PageLayout extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isNavVisible: false,
    }

    this.toggleNavigation = this.toggleNavigation.bind(this)
    this.detectPinch = this.detectPinch.bind(this)
  }

  componentDidMount() {
    document.addEventListener('touchstart', this.detectPinch, false)
    document.addEventListener('keydown', this.detectPinch, false)
  }

  componentWillUnmount() {
    document.removeEventListener('touchstart', this.detectPinch, false)
    document.removeEventListener('keydown', this.detectPinch, false)
  }

  render() {
    const { isUserLoggedIn, children, rootPath, noPadding } = this.props
    const { isNavVisible } = this.state

    return (
      <Layout noPadding={noPadding}>
        {isUserLoggedIn && isNavVisible && (
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

  detectPinch(event) {
    // Detect when:
    // - user clicks with two fingers (mobile)
    // - or when the user click the alt key (desktop)
    if ((event.touches && event.touches.length === 2) || event.keyCode === 18) {
      this.toggleNavigation()
    }
  }
}
