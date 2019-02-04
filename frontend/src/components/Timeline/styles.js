// libraries
import styled from 'styled-components'

export const Layout = styled.div`
  display: flex;
  flex-direction: column-reverse;

  padding: 20px;

  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
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
  height: 40px;
  width: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background-color: #add6ae;
`

export const Categories = styled.div`
  display: flex;
  padding: 5px;
`

export const Category = styled.div`
  font-size: 12px;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 8px;
  border-radius: 20px;

  background-color: ${props => props.theme.category[props.color]};
  color: ${props => props.theme.categoryText[props.color]};

  margin-right: 4px;
`

export const IconWrapper = styled.div`
  font-size: 16px;
  margin-right: 4px;
`
