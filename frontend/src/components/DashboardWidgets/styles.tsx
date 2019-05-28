// libraries
import styled from 'styled-components'
import { Link } from 'react-router-dom'
// components
import Box from 'shared/Box/Box'

export const Layout = styled.div`
  width: 100%;
  height: 100%;
  // The max-width is needed to make sure, the Widget has always the correct width.
  // max-width: 100% could lead to a higher width then the "100%" we want.
  max-width: 100vw;

  padding: 20px;

  overflow-x: auto;
  white-space: nowrap;
  scroll-snap-type: x mandatory;
`

export const WidgetLayout = styled(Box)`
  display: inline-grid;
  grid-template-rows: 36px calc(100% - 36px);
  vertical-align: top;

  width: 100%;
  height: 100%;

  margin-right: 20px;

  scroll-snap-align: center;
`

export const WidgetHeader = styled.div`
  padding: 5px 20px;
  border-bottom: 1px solid ${props => props.theme.border};

  text-align: center;
  overflow: hidden;
`

export const PlaceholderWrapper = styled.div`
  padding: 20px;
  width: 100%;
`

export const NewWidgetWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  vertical-align: top;

  width: 100%;
  height: 100%;

  scroll-snap-align: center;
`

export const NewWidgetBox = styled(Box)`
  width: 100%;
  margin: auto;
`

// It would be cleaner to have no NewWidgetLink and add the "link" behavour to the NewWidgetBox,
// but thats not possible with styled-components right now.
export const NewWidgetLink = styled(Link)`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  vertical-align: top;
  align-items: center;

  padding: 10px;

  &:active {
    background-color: ${props => props.theme.active};
    color: initial;
  }

  @media (min-width: ${props => props.theme.mediaQuery.tablet}) {
    padding: 40px 20px;
  }
`

export const CreateWidgetIcon = styled.div`
  margin-bottom: 20px;

  font-size: 82px;
  line-height: 76px;
  text-align: center;

  @media (min-width: ${props => props.theme.mediaQuery.tablet}) {
    margin-bottom: 40px;
  }
`
