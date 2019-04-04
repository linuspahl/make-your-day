// libraries
import styled from 'styled-components'
// components
import ContentBox from 'shared/ContentBox/ContentBox'

export const Layout = styled.div`
  width: 100%;
  height: 100%;

  padding: 20px;

  overflow-x: auto;
  white-space: nowrap;
`

export const WidgetLayout = styled.div`
  display: inline-block;
  vertical-align: top;

  width: 100%;
  height: 100%;

  margin-right: 20px;

  &:last-child {
    margin-bottom: 0;
    margin-right: 0;
  }
`

export const PlaceholderWrapper = styled.div`
  padding: 20px;
  width: 100%;
`

export const NoResultWrapper = styled(ContentBox)`
  height: 100%;
  max-width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`
