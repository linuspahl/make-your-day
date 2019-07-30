// libraries
import styled from 'styled-components'
// components
import ListItem from 'shared/list/ListItem/ListItem'
import Input from 'shared/form/Input/Input'
import TextBig from 'shared/text/TextBig/TextBig'

export const Layout = styled.div`
  width: 100%;
  position: relative;
`

export const Select = styled(Input)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 40px;

  padding-left: 10px;
  line-height: 40px;

  z-index: ${(props): string => props.theme.layerIndex.protrudeContent};
  caret-color: transparent;
  cursor: default;
  &::selection {
    background-color: transparent;
  }
`

export const ArrowIcon = styled(TextBig)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;

  width: 40px;
  height: 100%;

  top: 0;
  right: 0;

  color: inherit;
`

export const Header = styled(TextBig)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 40px;

  margin-bottom: ${(props): number => props.theme.dimensions.padding}px;
  padding-left: 10px;
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

export const OptionPreview = styled(TextBig)`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 25px;
  width: 25px;

  margin-right: 10px;
`

export const Footer = styled.div`
  margin-top: ${(props): number => props.theme.dimensions.padding}px;

  text-align: center;
`
