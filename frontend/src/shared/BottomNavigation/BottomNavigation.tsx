// libraries
import React from 'react'
import { Link } from 'react-router-dom'
// components
import { Wrapper, NavigationToggle } from './styles'
import FadeTransition from 'shared/FadeTransition/FadeTransition'

interface Props {
  toggleNavigation: () => void
  children: React.ReactNode
  isNavVisible: boolean
}

const BottomNavigation = ({
  children,
  isNavVisible,
  toggleNavigation,
}: Props): JSX.Element => (
  <FadeTransition fullWidth delay={200}>
    <Wrapper>
      {isNavVisible ? (
        <FadeTransition key="home">
          <Link to="/">
            <NavigationToggle
              data-testid="NavigationToggle"
              onClick={(): void => toggleNavigation()}
            >
              <i className="la la-home"></i>
            </NavigationToggle>
          </Link>
        </FadeTransition>
      ) : (
        <FadeTransition key="bars">
          <NavigationToggle
            data-testid="NavigationToggle"
            onClick={(): void => toggleNavigation()}
          >
            <i className="la la-bars"></i>
          </NavigationToggle>
        </FadeTransition>
      )}
      {children}
    </Wrapper>
  </FadeTransition>
)

export default BottomNavigation
