// libraries
import styled from 'styled-components'
// components
import Box from 'shared/Box/Box'

export const Element = styled(Box)`
  width: 100%;
  max-width: 470px;

  padding: ${(props): number => props.theme.dimensions.padding * 3}px
    ${(props): number => props.theme.dimensions.padding * 2}px;
`
