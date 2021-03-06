// libraries
import React from 'react'
import styled from 'styled-components'

const Element = styled.div<Props>`
  width: 100%;
  height: ${(props): string =>
    `${props.theme.padding * props.increasedHeight}rem`};
`

interface Props {
  increasedHeight?: number
}

const Spacer = ({ increasedHeight }: Props): JSX.Element => (
  <Element increasedHeight={increasedHeight || 1} />
)

export default Spacer
