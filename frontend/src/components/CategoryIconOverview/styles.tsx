// libraries
import styled from 'styled-components'

interface LayoutProps {
  context?: 'horizontal-scroll'
}

export const Layout = styled.div<LayoutProps>`
  padding: 10px 0 5px 0;
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

  margin-right: 10px;

  &:last-child {
    margin-right: 0;
  }

  ${(props): string =>
    props.context !== 'horizontal-scroll'
      ? `
        margin-bottom: 5px;
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
