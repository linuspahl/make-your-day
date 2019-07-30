// libraries
import styled from 'styled-components'
import ContentBox from 'shared/ContentBox/ContentBox'

export const Wrapper = styled.div`
  position: fixed;

  top: 0;
  right: 0;
  height: 100%;
  width: 100%;

  z-index: ${(props): string => props.theme.layerIndex.modal};
  overflow-y: auto;
`

export const Offset = styled.div`
  position: fixed;

  top: 0;
  left: 0;
  height: 100%;
  width: 100%;

  background-color: rgba(0, 0, 0, 0.35);
`

export const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;
  width: 100%;

  padding: ${(props): string => `${props.theme.padding}rem`};

  z-index: ${(props): string => props.theme.layerIndex.modalContent};
`

export const Head = styled.div`
  position: relative;

  margin-bottom: ${(props): string => `${props.theme.padding * 4}rem`};

  text-align: center;
`

export const CloseIconWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`

export const Content = styled(ContentBox)`
  position: relative;
`
