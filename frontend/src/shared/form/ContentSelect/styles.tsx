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

  width: 2.5rem;
  height: 2.5rem;

  bottom: 0;
  right: 0;

  color: inherit;
`

export const Header = styled(TextBig)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 2.5rem;

  margin-bottom: ${(props): string => `${props.theme.padding}rem`};
  padding-left: ${(props): string => `${props.theme.padding / 2}rem`};
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

  height: 1.5625rem;
  width: 1.5625rem;

  margin-right: ${(props): string => `${props.theme.padding / 2}rem`};
`

export const Footer = styled.div`
  margin-top: ${(props): string => `${props.theme.padding}rem`};

  text-align: center;
`
