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

  position: fixed;

  padding: 20px;

  z-index: ${props => props.theme.layerIndex.modal};
`

export const OptionsOffset = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  position: fixed;

  background-color: rgba(0, 0, 0, 0.35);
`

export const ModalWrapper = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: ${props => props.theme.layerIndex.modalContent};
`

export const Modal = styled.div`
  max-width: 420px;
  max-height: 100%;
  width: 100%;

  position: relative;
  display: grid;
  grid-template-rows: 40px 1fr;

  padding: 20px;
  border: 1px solid ${props => props.theme.border};

  background-color: ${props => props.theme.contentBoxBg};
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
