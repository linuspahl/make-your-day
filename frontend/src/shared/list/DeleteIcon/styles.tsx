import styled from 'styled-components'

export const Element = styled.div`
  height: 2.5rem;
  width: 2.5rem;

  display: flex;
  justify-content: center;
  align-items: center;

  color: ${(props): string => props.theme.text};

  &:active {
    background-color: ${(props): string => props.theme.active};
  }
`
