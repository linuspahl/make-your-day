// libraries
import styled from 'styled-components'
// images
import appBgImage from './appBg.jpg'
import appBgImageDark from './appBgDark.jpg'

interface LayoutProps {
  noPadding: boolean
}

export const Layout = styled.div<LayoutProps>`
  height: 100%;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;

  opacity: 1;
  transition: background-image 1s linear, background-color 1.5s linear;

  padding: ${(props): string => (props.noPadding ? '0' : '20px')};

  ${(props): string =>
    props.theme.settings.showAppBgImage
      ? `
    background-image: url(${
      props.theme.settings.nightMode ? appBgImageDark : appBgImage
    });
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    background-position: 50% 50%;
    `
      : `background-color: ${props.theme.appBg}`};

  color: ${(props): string => props.theme.text};
`
