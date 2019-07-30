// libraries
import styled from 'styled-components'

export const Records = styled.div`
  display: flex;
  flex-flow: wrap;

  margin-top: ${(props): string => `${props.theme.padding / 2}rem`};
`

export const NewRecordSection = styled.div`
  margin-bottom: ${(props): string => `${props.theme.padding}rem`};
`

export const CategoryRecords = styled.div`
  display: flex;
`

export const Category = styled.div`
  width: 100%;

  margin-bottom: ${(props): string => `${props.theme.padding / 2}rem`};

  &:last-child {
    margin-bottom: 0;
  }
`

export const CategoryTitle = styled.div`
  width: 100%;

  margin-bottom: ${(props): string => `${props.theme.padding / 4}rem`};
`
