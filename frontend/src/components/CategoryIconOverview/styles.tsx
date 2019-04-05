// libraries
import styled from 'styled-components'
// components
import Box from 'shared/Box/Box'

interface LayoutProps {
  context?: 'horizontal-scroll'
}

export const Layout = styled(Box)<LayoutProps>`
  padding: 10px 0 5px 0;
  ${props =>
    props.context === 'horizontal-scroll'
      ? `
      display: flex;
      align-items: center;

      height: 100%;
      padding: 10px 20px;

      background-color: ${props.theme.contentBoxBg};
      overflow-x: auto;
      overflow-y: hidden;
      white-space: nowrap;
      z-index: ${props.theme.layerIndex.protrudeContent}

      @media (min-width: ${
        props.theme.mediaQuery.tablet
      }) and (orientation: landscape) {
        flex-direction: column;

        height: auto;
        padding: 20px 10px;

        white-space: normal;
        overflow-x: hidden;
        overflow-y: auto;
      }
    `
      : ''}
`
interface IconWrapperProps {
  context?: 'horizontal-scroll'
}

export const IconWrapper = styled.div<IconWrapperProps>`
  display: inline-block;
  vertical-align: middle;

  margin-right: 10px;

  &:last-child {
    margin-right: 0;
  }

  ${props =>
    props.context === 'horizontal-scroll'
      ? `
      @media (min-width: ${
        props.theme.mediaQuery.tablet
      }) and (orientation: landscape) {
        margin-right: 0;
        margin-bottom: 10px;
        &:last-child {
          margin-bottom: 0;
        }
      }
        `
      : `
        margin-bottom: 5px;
      `}
`

export const NoResultWrapper = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`
