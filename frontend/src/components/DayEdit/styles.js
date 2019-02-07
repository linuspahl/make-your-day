import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Records = styled.div`
  display: flex;
  flex-flow: wrap;

  margin-top: 10px;
`

export const Record = styled(Link)`
  height: 32px;

  align-items: center;
  display: flex;
  justify-content: center;

  border-radius: 20px;
  margin: 0 5px 5px 0;
  padding: 5px 8px;

  background-color: ${props => props.theme.category[props.color]};

  font-size: 12px;
  color: ${props => props.theme.categoryText[props.color]};

  &:last-child {
    margin-right: 0;
  }
`

export const IconWrapper = styled.div`
  font-size: 16px;
  margin-right: 4px;
`

export const NewRecordSection = styled.div`
  margin-bottom: 25px;
`
