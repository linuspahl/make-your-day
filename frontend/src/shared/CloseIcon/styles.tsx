// libraries
import styled from 'styled-components'
// components
import TextBig from 'shared/text/TextBig/TextBig'

export const Element = styled(TextBig)`
  width: 40px;
  height: 40px;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 5px;

  cursor: pointer;

  &:active {
    background-color: ${(props): string => props.theme.active};
  }
`
