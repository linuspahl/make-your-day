// libraries
import styled from 'styled-components'
// components
import ListItem from 'shared/list/ListItem/ListItem'

export const Layout = styled.div`
  width: 100%;

  border: 1px solid ${props => props.theme.border};
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

export const OptionsWrapper = styled.div`
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;
  left: 0;

  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const OptionsOffset = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  position: absolute;

  background-color: rgba(0, 0, 0, 0.35);
`

export const Modal = styled.div`
  z-index: ${props => props.theme.layerIndex.modal};
  max-width: 420px;
  width: calc(100% - 40px);
  max-height: calc(100vh - 40px);

  padding: 20px;
  border: 1px solid ${props => props.theme.border};

  background-color: ${props => props.theme.contentBoxBg};
  overflow: auto;
  display: grid;
  grid-template-rows: 40px 1fr;
`

export const Option = styled(ListItem)`
  ${props => `
    background-color: ${props.isSelected ? props.theme.active : 'none'};
    cursor: pointer;
    &:active {
      background-color: ${props.theme.active};
    }
  `}
`

export const Options = styled.div`
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
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
