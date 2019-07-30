// libraries
import styled from 'styled-components'

interface ElementProps {
  spaceBetween?: boolean
  clickable: boolean
  children: React.ReactNode
}

export const Element = styled.li<ElementProps>`
  display: flex;
  align-items: center;
  justify-content: ${(props): string =>
    props.spaceBetween ? 'space-between' : 'start'};

  min-height: 1.5rem;

  border-top: 0.0625rem solid ${(props): string => props.theme.border};
  padding: ${(props): string => `0 ${props.theme.padding / 2}rem`};
  &:first-child {
    border-top: 0;
  }

  ${(props): string =>
    props.clickable
      ? `
    &:active {
      background-color: ${props.theme.active};
    }
  `
      : ``}
`
