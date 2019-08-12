// libraries
import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;

  position: relative;

  margin-top: ${(props): string => props.theme.fontSizes.mobile.normal}rem;

  @media (min-width: ${(props): string => props.theme.mediaQuery.tablet}) {
    margin-top: calc(
      ${(props): string => props.theme.fontSizes.mobile.normal}rem + 0.325rem
    );
  }
`

interface InputElementProps {
  autocomplete?: string
}

export const InputElement = styled.input<InputElementProps>`
  width: 100%;

  padding: 4px 0;

  border-radius: 0;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-bottom: 0.125rem solid ${(props): string => props.theme.border};

  color: ${(props): string => (props.disabled ? '#b5b5b5' : props.theme.text)};

  background-color: transparent;
  box-shadow: none;

  transition: all 0.4s;

  appearance: none;
  cursor: ${(props): string => (props.disabled ? 'not-allowed' : 'text')};

  &:focus {
    outline: none;
    border-bottom-color: ${(props): string => props.theme.primary};
  }

  ${(props): string => (props.value ? `+ label, ` : '')} &:focus + label {
    top: calc(
      -50% - ${(props): string => `${props.theme.fontSizes.mobile.normal / 1.5}rem`}
    );

    @media (min-width: ${(props): string => props.theme.mediaQuery.tablet}) {
      top: calc(
        -50% - ${(props): string => `${props.theme.fontSizes.tablet.normal / 1.5}rem`}
      );
    }
  }
`

export const InputLabel = styled.label`
  width: 100%;
  top: 0;
  left: 0;

  position: absolute;
  display: flex;
  align-items: center;

  padding: 4px 0;

  color: ${(props): string => props.theme.info};

  transition: all 0.4s;
  pointer-events: none;
`
