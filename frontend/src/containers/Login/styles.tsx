// libraries
import styled from 'styled-components'

export const Wrapper = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: ${(props): number => props.theme.dimensions.padding}px;
`
