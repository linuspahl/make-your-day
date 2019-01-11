// libraries
import styled from 'styled-components'
// components
import ListItem from 'shared/list/ListItem/ListItem'

export const Layout = styled.div`
  height: 40px;
  width: 100%;

  border: 1px solid ${props => props.theme.border};
`

export const Select = styled.div`
  width: 100%;
  height: 100%;

  padding: 0 10px;
  line-height: 40px;
  &:active {
    background-color: #efefef;
  }
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
  z-index: 1;
`

export const OptionsOffset = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  position: absolute;

  background-color: rgba(0, 0, 0, 0.35);
`

export const Options = styled.div`
  z-index: 2;
  max-width: 420px;
  width: calc(100% - 40px);
  max-height: calc(100vh - 40px);

  padding: 10px;
  border: 1px solid ${props => props.theme.border};

  background-color: ${props => props.theme.contentBoxBg};
  overflow: auto;
`

export const Option = styled(ListItem)`
  background-color: ${props => (props.isSelected ? '#efefef' : 'none')};
  &:active {
    background-color: #efefef;
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
