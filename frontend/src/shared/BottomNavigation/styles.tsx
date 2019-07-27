// libraries
import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;
  height: 70px;
  bottom: 0;
  left: 0;

  position: fixed;
  display: flex;

  border-radius: 35px 0 0 0;
  box-shadow: 0 -4px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background-color: ${(props): string => props.theme.contentBoxBg};

  z-index: ${(props): string => props.theme.layerIndex.bottomNavigation};
`

export const NavigationToggle = styled.div`
  width: 70px;
  height: 70px;

  font-size: 38px;

  display: flex;
  align-items: center;
  justify-content: center;
`
