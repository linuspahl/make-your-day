// libraries
import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 20px;
`

export const CategoryWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-right: 20px;

  &:last-child {
    margin-right: 0;
  }
`

interface ColorPreviewProps {
  color: string
}

export const ColorPreview = styled.div<ColorPreviewProps>`
  height: 25px;
  width: 6px;

  margin-right: 5px;

  background-color: ${(props): string => props.theme.category[props.color]};
`

export const CategoryName = styled.div`
  max-width: 100px;

  padding-top: 2px;

  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  &:last-item {
    margin-right: 0;
  }
`
