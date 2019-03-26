// libraries
import * as React from 'react'
import styled from 'styled-components'

interface ElementProps {
  justify?: string
}

export const Element = styled.div<ElementProps>`
  display: flex;
  justify-content: ${props => props.justify || 'flex-start'};
`
