// libraries
import React from 'react'
import styled from 'styled-components'
// components
import TextBig from 'shared/text/TextBig/TextBig'

const Wrapper = styled(TextBig)`
  display: flex;
  align-self: start;
`

interface Props {
  children: React.ReactNode | React.ReactNodeArray
}
const ActionIconWrapper = ({ children }: Props): JSX.Element => (
  <Wrapper>{children}</Wrapper>
)

export default ActionIconWrapper
