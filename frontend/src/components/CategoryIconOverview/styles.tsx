// libraries
import styled from 'styled-components'

interface LayoutProps {
  context?: 'horizontal-scroll'
}

export const Layout = styled.div<LayoutProps>`
  padding: ${(props): string =>
    `${props.theme.padding / 2}rem 0 ${props.theme.padding / 4}rem 0`};
  ${(props): string =>
    props.context === 'horizontal-scroll'
      ? `
      display: flex;
      align-items: center;
      
      padding: 0;
      
      overflow-x: auto;
      overflow-y: hidden;
      white-space: nowrap;
      z-index: ${props.theme.layerIndex.protrudeContent}
    `
      : `
      border-radius: 0;
      box-shadow: none;
    `}
`
interface IconWrapperProps {
  context?: 'horizontal-scroll'
}

export const IconWrapper = styled.div<IconWrapperProps>`
  display: inline-block;
  vertical-align: middle;

  margin-right: ${(props): string => `${props.theme.padding / 2}rem`};

  &:last-child {
    margin-right: 0;
  }

  ${(props): string =>
    props.context !== 'horizontal-scroll'
      ? `
        margin-bottom: ${props.theme.padding / 4}rem;
      `
      : ``}
`

export const NoResultWrapper = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`
