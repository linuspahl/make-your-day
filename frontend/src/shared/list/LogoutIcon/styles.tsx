// libraries
import styled from 'styled-components'
// components
import TextBig from 'shared/text/TextBig/TextBig'

export const Wrapper = styled(TextBig)`
  height: 2.5rem;
  width: 2.5rem;

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
