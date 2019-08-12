// libraries
import styled from 'styled-components'

interface ElementProps {
  columnAmount: number
}

export const Element = styled.div<ElementProps>`
  width: 100%;

  display: grid;
  grid-template-columns: repeat(${(props): number => props.columnAmount}, 1fr);

  > div {
    min-height: 2.5rem;

    display: flex;
    align-items: center;

    border-top: 0.0625rem solid ${(props): string => props.theme.border};
  }
`
