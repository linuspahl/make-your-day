// libraries
import React from 'react'
import styled from 'styled-components'

const Element = styled.div`
  width: 100%;

  color: ${(props): string => props.theme.info};
  /* hyphens works not in all browsers https://caniuse.com/#search=hyphens */
  hyphens: auto;
  word-break: break-word;
  text-align: center;
`

interface Props {
  message?: string
}

const NoResult = ({ message }: Props): JSX.Element => (
  <Element>{message || 'Kein Eintrag vorhanden'}</Element>
)

export default NoResult
