// libraries
import styled from 'styled-components'
// components
import TextBig from 'shared/text/TextBig/TextBig'

export const Element = styled(TextBig)`
  width: 2.5rem;
  height: 2.5rem;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: ${(props): string => `${props.theme.padding / 4}rem`};

  cursor: pointer;

  &:active {
    background-color: ${(props): string => props.theme.active};
  }
`
