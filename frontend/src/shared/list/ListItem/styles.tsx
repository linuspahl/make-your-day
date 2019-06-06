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

  min-height: 40px;

  border-top: 1px solid ${(props): string => props.theme.border};
  padding: 0 10px;
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
