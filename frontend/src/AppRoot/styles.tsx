// libraries
import styled from 'styled-components'
// images
import appBgImage from './images/appBg.jpg'
import appBgImageDark from './images/appBgDark.jpg'

export const AppWrapper = styled.div`
  height: 100%;

  /* Global styles, you can find all other, theme independent,
  global styles in the global.css  */
  font-size: ${(props): number => props.theme.fontSizes.mobile.normal}rem;
  color: ${(props): number => props.theme.text};

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
      : `background-image: ${props.theme.appBg}`};

  transition: background-image 1s linear, background-color 1.5s linear;

  @media (min-width: ${(props): string => props.theme.mediaQuery.tablet}) {
    font-size: ${(props): number => props.theme.fontSizes.tablet.normal}rem;
  }
`
