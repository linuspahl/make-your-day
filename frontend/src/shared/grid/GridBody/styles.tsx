// libraries
import styled from 'styled-components'

interface ElementProps {
  columnAmount: number
}

export const Element = styled.div<ElementProps>`
  display: grid;
  grid-template-columns: repeat(${(props): number => props.columnAmount}, 1fr);
  width: 100%;
  > div {
    display: flex;
    align-items: center;

    min-height: 40px;

    border-top: 1px solid ${(props): string => props.theme.border};
  }
`
