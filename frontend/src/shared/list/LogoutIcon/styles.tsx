// libraries
import styled from 'styled-components'
// components
import TextBig from 'shared/text/TextBig/TextBig'

export const Wrapper = styled(TextBig)`
  height: 40px;
  width: 40px;

  display: flex;
  justify-content: center;
  align-items: center;
  float: left;

  color: ${(props): string => props.theme.text};
  cursor: pointer;

  &:active {
    background-color: ${(props): string => props.theme.active};
  }
`
