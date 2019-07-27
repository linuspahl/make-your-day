// params
import { navigationItems } from 'params'
// libraries
import * as React from 'react'
import styled from 'styled-components'
// components
import NavigationItem from 'components/NavigationItem/NavigationItem'
import H1 from 'shared/H1/H1'
// interfaces
import { NavigationState, NavigationStateChange } from 'types/types'

// We need o use a wrapping div for the Modal component
// To show the navigation above other currently open modals
interface InnerWrapperProps {
  state: NavigationState
}
const InnerWrapper = styled.div<InnerWrapperProps>`
  bottom: 0;
  width: 100vw;

  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 20px 20px 100px 20px;
  box-shadow: ${(props): string => props.theme.boxShadow};
  background-color: ${(props): string => props.theme.contentBoxBg};

  text-align: center;

  transition: ${(props): string =>
    props.state.animateOnClose ? 'transform 300ms linear' : ''};
  transform: translateX(-100vw);
  will-change: transform;

  z-index: ${(props): string => props.theme.layerIndex.navigation};

  ${(props): string => {
    if (props.state.open)
      return `
      transform: none;
      transition: transform 300ms linear;
    `
  }}

  @media (min-width: ${(props): string => props.theme.mediaQuery.tablet}) {
    width: 300px;
    height: 100%;
    
    transform: translateX(-300px);

    ${(props): string => {
      if (props.state.open)
        return `
      transform: none;
      transition: transform 300ms linear;
    `
    }}
  }
`

interface Props {
  fullPath: string
  rootPath: string
  state: NavigationState
  toggleAction: (state: NavigationStateChange) => void
}

const Navigation = (props: Props): JSX.Element => {
  const { toggleAction, rootPath, fullPath, state } = props
  return (
    <InnerWrapper state={state}>
      <H1>Menü</H1>
      <ul>
        {navigationItems.map(
          (route): JSX.Element => (
            <NavigationItem
              toggleAction={(newPath): void => {
                // We only want to animate the navigation close, when the route really changes
                // this looks smother in combination with the content fade effect
                toggleAction({
                  animateOnClose: newPath == fullPath ? true : false,
                })
              }}
              key={route.path}
              route={route}
              rootPath={rootPath}
            />
          )
        )}
      </ul>
    </InnerWrapper>
  )
}

export default Navigation
