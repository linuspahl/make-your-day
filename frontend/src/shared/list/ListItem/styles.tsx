// libraries
import styled from 'styled-components'

interface ElementProps {
  spaceBetween?: boolean
  clickable: boolean
  children: React.ReactNode
}

export const Element = styled.li<ElementProps>`
  min-height: 1.5rem;

  display: flex;
  align-items: center;
  justify-content: ${(props): string =>
    props.spaceBetween ? 'space-between' : 'start'};

  padding: ${(props): string =>
    `${props.theme.padding / 4}rem ${props.theme.padding / 2}rem`};
  border-top: 0.0625rem solid ${(props): string => props.theme.border};

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

  @media (min-width: ${(props): string => props.theme.mediaQuery.tablet}) {
    padding: ${(props): string =>
      `${props.theme.padding / 4}rem ${props.theme.padding / 2}rem`};
  }
`
