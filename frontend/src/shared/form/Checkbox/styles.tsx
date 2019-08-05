// libraries
import styled from 'styled-components'
// components
import TextBig from 'shared/text/TextBig/TextBig'

interface WrapperProps {
  disabled?: boolean
}

export const Wrapper = styled.div<WrapperProps>`
  position: relative;

  height: 2.5rem;
  width: 2.5rem;

  color: ${(props): string =>
    props.disabled ? props.theme.border : props.theme.text};
  cursor: ${(props): string => (props.disabled ? 'not-allowed' : 'pointer')};
`

export const Element = styled.input`
  position: relative;
  height: 100%;
  width: 100%;

  background-color: transparent;
  border-radius: 0;
  border-top: 0;
  border-right: 0;
  border-left: 0;
  border-bottom: 0.125rem solid ${(props): string => props.theme.border};

  appearance: none;
  cursor: inherit;

  &:focus {
    outline: none;
    border-bottom-color: ${(props): string => props.theme.primary};
  }
`

export const Checkmark = styled(TextBig)`
  position: absolute;

  top: 0;
  right: 0;
  height: 100%;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`
