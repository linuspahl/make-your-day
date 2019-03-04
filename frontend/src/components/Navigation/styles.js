// libraries
import styled from 'styled-components'

export const Layout = styled.div`
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;

  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 20px;
  background-color: ${props => props.theme.appBg};

  z-index: ${props => props.theme.layerIndex.modal};
`

export const CloseIconWrapper = styled.div`
  top: 10px;
  right: 10px;

  position: fixed;

  &:active {
    background-color: ${props => props.theme.active};
  }
`

export const Pages = styled.ul`
  width: 100%;
  max-width: 420px;

  padding: 40px 20px 40px 20px;
  border: 1px solid ${props => props.theme.border};

  background-color: ${props => props.theme.contentBoxBg};
`
