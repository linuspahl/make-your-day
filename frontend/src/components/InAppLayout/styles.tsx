// libraries
import styled from 'styled-components'

export const Layout = styled.div`
  height: 100%;
  width: 100%;
`

export const ChildrenWrapper = styled.div`
  ${(props): string => {
    const {
      theme: {
        dimensions: { bottomMenu },
      },
    } = props
    return `
    height: calc(
      100vh - ${bottomMenu - bottomMenu / 4}px
    ); 
    width: 100%;

    overflow: auto;`
  }}
`
