// libraries
import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: ${(props): string => `${props.theme.padding}rem`};
`

export const CategoryWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-right: ${(props): string => `${props.theme.padding}rem`};

  &:last-child {
    margin-right: 0;
  }
`

interface ColorPreviewProps {
  color: string
}

export const ColorPreview = styled.div<ColorPreviewProps>`
  height: 1.5rem;
  width: 0.4rem;

  margin-right: 0.3rem;

  background-color: ${(props): string => props.theme.category[props.color]};
`

export const CategoryName = styled.div`
  max-width: 8.125rem;

  padding-top: 0.125rem;

  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  &:last-item {
    margin-right: 0;
  }
`
