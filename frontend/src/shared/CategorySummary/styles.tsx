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

  padding: 0.1875rem 0.6rem 0.1875rem 0.5rem;
  margin: 0.125rem 0.25rem 0.125rem 0;
  border-radius: 2.5rem;
  border: 0.0625rem solid ${(props): string => props.theme.border};

  background-color: ${(props): string =>
    props.color ? props.theme.category[props.color] : props.theme.border};
  color: ${(props): string =>
    props.color ? props.theme.categoryText[props.color] : props.theme.text};
  font-size: ${(props): string => `${props.theme.fontSizes.mobile.small}rem`};

  &:last-child {
    margin-right: 0;
  }

  @media (min-width: ${(props): string => props.theme.mediaQuery.tablet}) {
    font-size: ${(props): string => `${props.theme.fontSizes.mobile.small}rem`};
  }
`

export const IconWrapper = styled.div`
  // min-width is needed for a stutter free loading
  // needed because of the font icon
  // should have width of the font-size
  min-width: ${(props): string => `${props.theme.fontSizes.mobile.normal}rem`};

  margin-right: ${(props): string => `${props.theme.padding / 5}rem`};

  @media (min-width: ${(props): string => props.theme.mediaQuery.tablet}) {
    min-width: ${(props): string =>
      `${props.theme.fontSizes.tablet.normal}rem`};
  }
`

export const CategoryTitle = styled.div`
  max-width: 3.125rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin-right: ${(props): string => `${props.theme.padding / 5}rem`};
`
