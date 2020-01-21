// libraries
import styled from 'styled-components'
// interfaces
import { NavigationState } from 'types/types'

// We need o use a wrapping div for the Modal component
// To show the navigation above other currently open modals
interface WrapperProps {
  open: NavigationState['open']
  animateOnClose: NavigationState['animateOnClose']
}

export const Wrapper = styled.div<WrapperProps>`
  ${(props): string => {
    const {
      theme: {
        padding,
        boxShadow,
        contentBoxBg,
        layerIndex: { navigation: navigationIndex },
        mediaQuery: { tablet },
      },
      animateOnClose,
      open,
    } = props
    return `
      width: 100vw;
      bottom: 0;

      position: fixed;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      padding: ${padding}rem ${padding}rem 6.25rem ${padding}rem;
      
      text-align: center;

      background-color: ${contentBoxBg};

      will-change: transform;

      box-shadow: ${boxShadow};
      z-index: ${navigationIndex};

      ${
        open
          ? `
            transform: none;
            transition: transform 300ms linear;`
          : `
            transition: ${animateOnClose ? 'transform 300ms linear' : ''};
            transform: translateX(-100vw);
          `
      }
      

      @media (min-width: ${tablet}) {
        width: 18rem;
        height: 100%;
        
        transform: translateX(-18re);

        ${
          open
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

  margin-bottom: ${(props): string => `${props.theme.padding}rem`};

  text-align: center;

  @media (min-width: ${(props): string => props.theme.mediaQuery.tablet}) {
    margin-bottom: ${(props): string => `${props.theme.padding * 3}rem`};
  }
`

export const CloseIconWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`
