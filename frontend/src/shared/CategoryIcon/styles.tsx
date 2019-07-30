// libraries
import styled from 'styled-components'

interface CircleProps {
  size?: number
  color?: string
  to?: string
  as?: React.ReactNode
}

export const Circle = styled.div<CircleProps>`
  min-height: ${(props): string => `${props.size || 3.15}rem`};
  min-width: ${(props): string => `${props.size || 3.15}rem`};

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: ${(props): string => `0.0625rem solid ${props.theme.border}`};

  background-color: ${(props): string =>
    props.color ? props.theme.category[props.color] : props.theme.border};
  color: ${(props): string => props.theme.categoryText[props.color]};
  font-size: ${(props): string => `${props.size ? props.size / 2 : 1.75}rem`};

  &:visited {
    color: ${(props): string => props.theme.categoryText[props.color]};
  }
`
