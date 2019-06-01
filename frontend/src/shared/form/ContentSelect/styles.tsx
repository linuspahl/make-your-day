// libraries
import styled from 'styled-components'
// components
import ListItem from 'shared/list/ListItem/ListItem'

export const Layout = styled.div`
  width: 100%;

  border: 1px solid ${(props): string => props.theme.border};
`

export const Select = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 40px;

  padding-left: 10px;
  line-height: 40px;

  cursor: pointer;
`

export const ArrowIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 40px;
  height: 100%;

  font-size: 24px;

  color: inherit;
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 40px;

  margin-bottom: 20px;
  padding-left: 10px;
  font-size: 20px;
`

export const Options = styled.div`
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`

interface OptionProps {
  isSelected: boolean
}

export const Option = styled(ListItem)<OptionProps>`
  ${(props): string => `
    background-color: ${props.isSelected ? props.theme.active : 'none'};
    cursor: pointer;
    &:active {
      background-color: ${props.theme.active};
    }
  `}
`

export const OptionPreview = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 25px;
  width: 25px;

  margin-right: 10px;

  font-size: 25px;
`

export const Footer = styled.div`
  margin-top: 20px;

  text-align: center;
`
