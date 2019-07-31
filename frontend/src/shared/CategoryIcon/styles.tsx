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

  box-shadow: 0 0.1875rem 0.0625rem -0.125rem rgba(0, 0, 0, 0.2),
    0 0.125rem 0.125rem 0 rgba(0, 0, 0, 0.14),
    0 0.0625rem 0.3125rem 0 rgba(0, 0, 0, 0.12);
  &:hover {
    box-shadow: 0 0.125rem 0.25rem -0.0625rem rgba(0, 0, 0, 0.2),
      0 0.25rem 0.3125rem 0 rgba(0, 0, 0, 0.14),
      0 0.0625rem 0.625rem 0 rgba(0, 0, 0, 0.12);
  }
  &:active {
    box-shadow: 0 0.3125rem 0.3125rem -0.1875rem rgba(0, 0, 0, 0.2),
      0 0.5rem 0.625rem 0.0625rem rgba(0, 0, 0, 0.14),
      0 0.1875rem 0.875rem 0.125rem rgba(0, 0, 0, 0.12);
  }

  &:visited {
    color: ${(props): string => props.theme.categoryText[props.color]};
  }
`
