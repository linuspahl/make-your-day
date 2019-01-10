// libraries
import React from 'react'
import { withRouter } from 'react-router-dom'
// components
import CloseIcon from 'shared/CloseIcon/CloseIcon'
import { CloseIconWrapper, Layout, Pages, RouteActive } from './styles'
import NavigationItem from 'components/NavigationItem/NavigationItem'

class Navigation extends React.Component {
  render() {
    const {
      toggleNavigation,
      history: {
        location: { pathname: activeRoute },
      },
    } = this.props
    const items = [{ path: '/', title: 'Dashboard' }]

    return (
      <Layout>
        <CloseIconWrapper>
          <CloseIcon close={toggleNavigation} />
        </CloseIconWrapper>
        <Pages>
          {items.map(route => (
            <NavigationItem
              key={route.path}
              route={route}
              activeRoute={activeRoute}
            />
          ))}
        </Pages>
      </Layout>
    )
  }
}

export default withRouter(Navigation)
