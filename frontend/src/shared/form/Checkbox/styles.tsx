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

  border: 0.0625rem solid ${(props): string => props.theme.border};

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
  border: 0;

  appearance: none;

  cursor: inherit;
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
