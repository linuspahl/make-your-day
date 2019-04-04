// libraries
import * as React from 'react'
import styled from 'styled-components'

const Element = styled.div`
  width: 100%;

  // hyphens works not in all browsers https://caniuse.com/#search=hyphens
  hyphens: auto;
  word-break: break-word;
  text-align: center;
`

interface Props {
  message?: string
}

const NoResult = (props: Props): React.ReactElement => (
  <Element>{props.message || 'Kein Eintrag vorhanden'}</Element>
)

export default NoResult
