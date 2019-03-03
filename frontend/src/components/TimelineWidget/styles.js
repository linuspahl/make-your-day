// libraries
import styled from 'styled-components'
// components
import ContentBox from 'shared/ContentBox/ContentBox'

export const Layout = styled.div`
  display: flex;
  flex-direction: column-reverse;

  padding: 0 20px;

  // Due to flexbox we can't use padding for the top spacing
  margin-top: 20px;

  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: ${props =>
      props.theme.mediaQuery.tablet}) and (orientation: landscape) {
    padding: 20px 0 20px 20px;
  }
`

export const Box = styled(ContentBox)`
  padding: 10px;
  @media (min-width: ${props =>
      props.theme.mediaQuery.tablet}) and (orientation: landscape) {
    max-width: 100%;
  }
`
