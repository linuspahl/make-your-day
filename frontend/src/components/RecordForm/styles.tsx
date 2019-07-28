// libraries
import styled from 'styled-components'

export const Form = styled.form`
  margin-top: 15px;
`

export const Category = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: ${(props): number => props.theme.dimensions.padding}px;
  margin-bottom: 40px;
`

export const CategoryIconWrapper = styled.div`
  margin-right: 10px;
  display: inline-block;
`
