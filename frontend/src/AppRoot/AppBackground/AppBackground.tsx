// libraries
import React from 'react'
import styled from 'styled-components'
// images
import appBgImage from './appBg.jpg'
import appBgImageDark from './appBgDark.jpg'

const Wrapper = styled.div`
  height: 100%;

  transition: background-image 1s linear, background-color 1.5s linear;

  color: ${(props): string => props.theme.text};

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
`

interface Props {
  children: React.ReactNode
}

const AppBackground = (props: Props): JSX.Element => {
  return <Wrapper>{props.children}</Wrapper>
}

export default AppBackground
