// libraries
import styled from 'styled-components'

interface CircleProps {
  size?: number
  color?: string
  to?: string
  as?: React.ReactNode
}

export const Circle = styled.div<CircleProps>`
  min-height: ${(props): number => props.size || 50}px;
  min-width: ${(props): number => props.size || 50}px;

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid ${(props): string => props.theme.border};

  background-color: ${(props): string =>
    props.color ? props.theme.category[props.color] : props.theme.border};
  color: ${(props): string => props.theme.categoryText[props.color]};
  font-size: ${(props): number => (props.size ? props.size / 2 : 28)}px;

  &:visited {
    color: ${(props): string => props.theme.categoryText[props.color]};
  }
`
