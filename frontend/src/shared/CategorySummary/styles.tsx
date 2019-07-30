// libraries
import styled from 'styled-components'
// components
import TextSmall from 'shared/text/TextSmall/TextSmall'

interface CategoryProps {
  color?: string
  to?: string
  as?: React.ReactNode
}

export const Category = styled(TextSmall)<CategoryProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 3px 8px;
  margin: 2px 4px 2px 0;
  border-radius: 20px;
  border: 1px solid ${(props): string => props.theme.border};

  background-color: ${(props): string =>
    props.color ? props.theme.category[props.color] : props.theme.border};
  color: ${(props): string =>
    props.color ? props.theme.categoryText[props.color] : props.theme.text};
  font-size: ${(props): number => props.theme.fontSizes.mobile.small}rem;

  &:last-child {
    margin-right: 0;
  }

  @media (min-width: ${(props): string => props.theme.mediaQuery.tablet}) {
    font-size: ${(props): number => props.theme.fontSizes.mobile.small}rem;
  }
`

export const IconWrapper = styled.div`
  // min-width is needed for a stutter free loading
  // needed because of the font icon
  // should have width of the font-size
  min-width: ${(props): number => props.theme.fontSizes.mobile.normal}rem;

  margin-right: 4px;

  @media (min-width: ${(props): string => props.theme.mediaQuery.tablet}) {
    min-width: ${(props): number => props.theme.fontSizes.tablet.normal}rem;
  }
`

export const CategoryTitle = styled.div`
  max-width: 50px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin-right: 3px;
`
