// libraried
import React from 'react'
// components
import { Wrapper, NavigationToggle } from './styles'
import FadeTransition from 'shared/FadeTransition/FadeTransition'

interface Props {
  toggleNavigation: () => void
  children: React.ReactNode
}

const BottomNavigation = (props: Props): JSX.Element => {
  return (
    <FadeTransition fullWidth delay={200}>
      <Wrapper>
        <NavigationToggle
          onClick={(): void => props.toggleNavigation()}
          data-testid="NavigationToggle"
        >
          <i className="la la-bars"></i>
        </NavigationToggle>
        {props.children}
      </Wrapper>
    </FadeTransition>
  )
}

export default BottomNavigation
