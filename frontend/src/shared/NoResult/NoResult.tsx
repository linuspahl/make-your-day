// libraries
import * as React from 'react'
import styled from 'styled-components'

const Element = styled.div`
  width: 100%;

  text-align: center;
`

interface Props {
  message?: string
}

const NoResult = (props: Props): React.ReactElement => (
  <Element>{props.message || 'Kein Eintrag vorhanden'}</Element>
)

export default NoResult
