// libraries
import styled from 'styled-components'
// interfaces
import { NavigationState } from 'types/types'

// We need o use a wrapping div for the Modal component
// To show the navigation above other currently open modals
interface WrapperProps {
  state: NavigationState
}

export const Wrapper = styled.div<WrapperProps>`
  ${(props): string => {
    const {
      theme: {
        dimensions: { padding },
        boxShadow,
        contentBoxBg,
        layerIndex: { navigation: navigationIndex },
        mediaQuery: { tablet },
      },
    } = props
    return `
      bottom: 0;
      width: 100vw;

      position: fixed;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      padding: ${padding}px ${padding}px 100px ${padding}px;
      box-shadow: ${boxShadow};
      background-color: ${contentBoxBg};

      text-align: center;

      
      will-change: transform;

      z-index: ${navigationIndex};

      ${
        props.state.open
          ? `
            transform: none;
            transition: transform 300ms linear;`
          : `
            transition: ${
              props.state.animateOnClose ? 'transform 300ms linear' : ''
            };
            transform: translateX(-100vw);
          `
      }
      

      @media (min-width: ${tablet}) {
        width: 300px;
        height: 100%;
        
        transform: translateX(-300px);

        ${
          props.state.open
            ? `
          transform: none;
          transition: transform 300ms linear;
        `
            : ``
        }}
      }
    `
  }}
`

export const Offset = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  height: 100vh;
  width: 100vw;

  cursor: pointer;
  z-index: ${(props): number => props.theme.layerIndex.navigation - 1};
`

export const Head = styled.div`
  width: 100%;

  position: relative;

  margin-bottom: ${(props): number => props.theme.dimensions.padding * 2}px;

  text-align: center;
`

export const CloseIconWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`
