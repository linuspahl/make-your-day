// libraries
import styled from 'styled-components'
import { Link } from 'react-router-dom'
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
`

export const Day = styled(Link)`
  width: 100%;

  display: flex;
  align-items: center;

  padding: 5px 0;
  border-top: 1px solid ${props => props.theme.border};

  &:first-child {
    border-top: 0;
  }
`

export const Shortcut = styled.div`
  min-height: 40px;
  min-width: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-right: 5px;

  border-radius: 50%;
  border: 1px solid ${props => props.theme.border};

  background-color: ${props => props.theme.timelineDay};
`

export const Categories = styled.div`
  display: flex;
  flex-flow: wrap;

  padding: 5px;
`
