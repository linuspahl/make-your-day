// libraries
import styled from 'styled-components'
// components
import ContentBox from 'shared/ContentBox/ContentBox'

export const Layout = styled.div`
  ${props => `
    padding: 10px;

    ${
      !props.inline
        ? `
        border-top: 1px solid ${props.theme.border};
        border-bottom: 1px solid ${props.theme.border};
      `
        : ``
    }

    background-color: ${props.theme.contentBoxBg};
    overflow-x: auto;
    overflow-y: hidden;
`}
`

export const StyledContentBox = styled(ContentBox)`
  padding: 35px 10px;
`

export const List = styled.div`
  width: 100%;
  max-width: 100%;

  display: grid;
  ${props =>
    props.inline
      ? `
      grid-template-columns: repeat(auto-fit,minmax(45px,1fr));
      grid-gap: 10px;
    }`
      : `
      grid-auto-flow: column;
      grid-gap: 5px;
    `}
`
