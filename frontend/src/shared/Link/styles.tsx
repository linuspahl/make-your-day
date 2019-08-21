// libraries
import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Element = styled(Link)`
  color: ${(props): string => props.theme.link};
`
