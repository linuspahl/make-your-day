// libraries
import styled from 'styled-components'

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
`

export const Box = styled(ContentBox)`
  padding: 10px;
`

export const Day = styled.div`
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

  background-color: #add6ae;
`

export const Categories = styled.div`
  display: flex;
  flex-flow: wrap;

  padding: 5px;
`

export const Category = styled.div`
height: 17px

  font-size: 12px;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 8px;
  border-radius: 20px;

  background-color: ${props => props.theme.category[props.color]};
  color: ${props => props.theme.categoryText[props.color]};

  margin: 2px 4px 2px 0;
  &:last-child {
    margin-right: 0;
  }
`

export const IconWrapper = styled.div`
  font-size: 16px;
  margin-right: 4px;
`
