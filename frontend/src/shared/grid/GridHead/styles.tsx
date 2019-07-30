// libraries
import styled from 'styled-components'

interface ElementProps {
  columnAmount: number
}

export const Element = styled.div<ElementProps>`
  display: grid;
  grid-template-columns: repeat(${(props): number => props.columnAmount}, 1fr);

  width: 100%;

  margin-bottom: ${(props): string => `${props.theme.padding / 2}rem`};
`
