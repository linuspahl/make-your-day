// libraries
import styled from 'styled-components'

export const Form = styled.form`
  margin-top: ${(props): string => `${props.theme.padding}rem`};
`

export const Category = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: ${(props): string => `${props.theme.padding}rem`};
  margin-bottom: ${(props): string => `${props.theme.padding * 4}rem`};
`

export const CategoryIconWrapper = styled.div`
  margin-right: ${(props): string => `${props.theme.padding / 2}rem`};

  display: inline-block;
`
