// libraries
import styled from 'styled-components'
import { Link } from 'react-router-dom'
// components
import ContentBox from 'shared/ContentBox/ContentBox'
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

interface NewWidgetTileProps {
  onClick?: () => void
}

export const NewWidgetTile = styled(ContentBox)<NewWidgetTileProps>`
  display: flex;
  flex-direction: column;
  vertical-align: top;
  align-items: center;

  cursor: pointer;
  appearance: none;

  &:active {
    background-color: ${props => props.theme.active};
  }
`

// It would be cleaner to have no NewWidgetLink and add the "link" behavour to the NewWidgetTile,
// but thats not possible with styled-components right now.
export const NewWidgetLink = styled(Link)`
  width: 100%;
  height: 100%;
`

export const CreateWidgetIcon = styled.div`
  margin-bottom: 40px;

  font-size: 82px;
  line-height: 76px;
  text-align: center;
`
