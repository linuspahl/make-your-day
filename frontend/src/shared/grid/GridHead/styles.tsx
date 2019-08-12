// libraries
import styled from 'styled-components'

interface ElementProps {
  columnAmount: number
}

export const Element = styled.div<ElementProps>`
  width: 100%;

  display: grid;
  grid-template-columns: repeat(${(props): number => props.columnAmount}, 1fr);

  margin-bottom: ${(props): string => `${props.theme.padding / 2}rem`};
`
