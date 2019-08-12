// libraries
import styled from 'styled-components'
// components
import ContentBox from 'shared/ContentBox/ContentBox'

export const Wrapper = styled.div`
  top: 0;
  right: 0;
  height: 100%;
  width: 100%;

  position: fixed;

  z-index: ${(props): string => props.theme.layerIndex.modal};
  overflow-y: auto;
`

export const Offset = styled.div`
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;

  position: fixed;

  background-color: rgba(0, 0, 0, 0.35);
`

export const ContentWrapper = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: ${(props): string => `${props.theme.padding}rem`};

  z-index: ${(props): string => props.theme.layerIndex.modalContent};
`

export const Head = styled.div`
  position: relative;

  margin-bottom: ${(props): string => `${props.theme.padding}rem`};

  text-align: center;
`

export const CloseIconWrapper = styled.div`
  right: 0;
  top: 0;

  position: absolute;
`

export const Content = styled(ContentBox)`
  max-height: ${(props): string =>
    `calc(100vh - ${props.theme.padding * 2}rem)`};

  display: grid;
  grid-template-rows: max-content minmax(1rem, 1fr);
  position: relative;

  margin: auto;
`
