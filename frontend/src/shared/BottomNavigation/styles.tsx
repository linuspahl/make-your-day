// libraries
import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;
  height: ${(props): string => `${props.theme.heights.bottomMenu}rem`};
  bottom: 0;
  left: 0;

  position: fixed;
  display: flex;

  border-radius: ${(props): string =>
    `${props.theme.heights.bottomMenu / 2}rem 0 0 0`};

  background-color: ${(props): string => props.theme.contentBoxBg};
  box-shadow: 0 -0.25rem 0.1875rem rgba(0, 0, 0, 0.12),
    0 0.0625rem 0.125rem rgba(0, 0, 0, 0.24);

  z-index: ${(props): string => props.theme.layerIndex.bottomNavigation};
`

export const NavigationToggle = styled.div`
  width: ${(props): string => `${props.theme.heights.bottomMenu}rem`};
  height: ${(props): string => `${props.theme.heights.bottomMenu}rem`};

  display: flex;
  align-items: center;
  justify-content: center;

  color: ${(props): number => props.theme.text};
  font-size: ${(props): string => `${props.theme.heights.bottomMenu / 2}rem`};

  cursor: pointer;
`
