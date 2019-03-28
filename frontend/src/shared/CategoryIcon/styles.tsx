// libraries
import styled from 'styled-components'

interface CircleProps {
  size?: number
  color?: string
  to?: string
  as?: React.ReactNode
}

export const Circle = styled.div<CircleProps>`
  min-height: ${props => props.size || 50}px;
  min-width: ${props => props.size || 50}px;

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid ${props => props.theme.border};

  background-color: ${props =>
    props.color ? props.theme.category[props.color] : props.theme.border};
  color: ${props => props.theme.categoryText[props.color]};
  font-size: ${props => (props.size ? props.size / 2 : 28)}px;
`
