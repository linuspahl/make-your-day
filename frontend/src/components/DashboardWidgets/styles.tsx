// libraries
import styled from 'styled-components'
import { Link } from 'react-router-dom'
// components
import Box from 'shared/Box/Box'

export const Layout = styled.div`
  width: 100%;
  height: 100%;
  /* The max-width is needed to make sure, the Widget has always the correct width.
  max-width: 100% could lead to a higher width then the "100%" we want. */
  max-width: 100vw;

  padding: ${(props): string => `0 ${props.theme.padding}rem`};

  overflow-x: auto;
  white-space: nowrap;
  scroll-snap-type: x mandatory;

  ::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: ${(props): string =>
      props.theme.mediaQuery.tablet}) and (orientation: landscape) {
    padding: 0;
  }
`

export const WidgetLayout = styled(Box)`
  display: inline-grid;
  grid-template-rows: min-content minmax(1rem, 1fr);
  vertical-align: top;

  width: 100%;
  height: 100%;

  margin-right: ${(props): string => `${props.theme.padding}rem`};

  scroll-snap-align: center;

  @media (min-width: ${(props): string =>
      props.theme.mediaQuery.tablet}) and (orientation: landscape) {
    height: 40vh;
    display: grid;

    margin-right: 0;
    margin-top: ${(props): string => `${props.theme.padding}rem`};
  }
`

export const WidgetHeader = styled.div`
  padding: ${(props): string =>
    `${props.theme.padding / 2}rem ${props.theme.padding}rem`};
  border-bottom: 0.0625rem solid ${(props): string => props.theme.border};

  text-align: center;
  overflow: hidden;
`

export const PlaceholderWrapper = styled.div`
  padding: ${(props): string => `${props.theme.padding}rem`};
  width: 100%;
`

export const NewWidgetWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  vertical-align: top;

  width: 100%;
  height: 100%;

  scroll-snap-align: center;

  @media (min-width: ${(props): string =>
      props.theme.mediaQuery.tablet}) and (orientation: landscape) {
    height: 40vh;
  }
`

export const NewWidgetBox = styled(Box)`
  width: 100%;
  margin: auto;
`

// It would be cleaner to have no NewWidgetLink and add the "link" behavour to the NewWidgetBox,
// but thats not possible with styled-components right now.
export const NewWidgetLink = styled(Link)`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  vertical-align: top;
  align-items: center;

  padding: ${(props): string => `${props.theme.padding}rem`};

  &:active {
    background-color: ${(props): string => props.theme.active};
    color: initial;
  }

  @media (min-width: ${(props): string =>
      props.theme.mediaQuery.tablet}) and (orientation: landscape) {
    padding: ${(props): string =>
      `${props.theme.padding * 2}rem ${props.theme.padding}rem`};
  }
`

export const CreateWidgetIcon = styled.div`
  margin-bottom: ${(props): string => `${props.theme.padding}rem`};

  font-size: 5.125rem;
  line-height: 4.75rem;
  text-align: center;
  color: ${(props): string => `${props.theme.info}`};

  @media (min-width: ${(props): string =>
      props.theme.mediaQuery.tablet}) and (orientation: landscape) {
    margin-bottom: ${(props): string => `${props.theme.padding * 2}rem`};
  }
`
