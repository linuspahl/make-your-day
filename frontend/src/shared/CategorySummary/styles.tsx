// libraries
import styled from 'styled-components'

interface CategoryProps {
  color?: string
  to?: string
  as?: React.ReactNode
}

export const Category = styled.div<CategoryProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 3px 8px;
  margin: 2px 4px 2px 0;
  border-radius: 20px;
  border: 1px solid ${props => props.theme.border};

  background-color: ${props =>
    props.color ? props.theme.category[props.color] : props.theme.border};
  color: ${props => props.theme.categoryText[props.color]};
  font-size: 12px;

  &:last-child {
    margin-right: 0;
  }
`

export const IconWrapper = styled.div`
  // min-width is needed for a stutter free loading
  // needed because of the font icon
  // should have with of the font-size
  min-width: 16px;

  margin-right: 4px;

  font-size: 16px;
`
