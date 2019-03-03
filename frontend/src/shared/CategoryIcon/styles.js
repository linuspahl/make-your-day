import styled from 'styled-components'

export const Circle = styled.div`
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
  font-size: ${props => props.size / 2 || 28}px;
`
