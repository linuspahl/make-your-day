// libraries
import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;
  height: ${(props): number => props.theme.dimensions.bottomMenu}px;
  bottom: 0;
  left: 0;

  position: fixed;
  display: flex;

  border-radius: ${(props): number => props.theme.dimensions.bottomMenu / 2}px 0
    0 0;
  box-shadow: 0 -4px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background-color: ${(props): string => props.theme.contentBoxBg};

  z-index: ${(props): string => props.theme.layerIndex.bottomNavigation};
`

export const NavigationToggle = styled.div`
  width: ${(props): number => props.theme.dimensions.bottomMenu}px;
  height: ${(props): number => props.theme.dimensions.bottomMenu}px;

  font-size: ${(props): number => props.theme.dimensions.bottomMenu / 2}px;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
`
