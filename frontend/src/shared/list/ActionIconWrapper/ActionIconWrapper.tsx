// libraries
import * as React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  align-self: start;
`

interface Props {
  children: React.ReactNode | React.ReactNodeArray
}
const ActionIconWrapper = (props: Props): JSX.Element => (
  <Wrapper>{props.children}</Wrapper>
)

export default ActionIconWrapper
