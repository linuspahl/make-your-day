// libraries
import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  min-height: 100%;

  padding: 20px 20px 25px 20px;

  display: flex;
  align-items: center;
  justify-content: center;

  > div {
    margin: auto;
  }
`

interface Props {
  children: React.ReactNode
}

const DefaultPageLayout = (props: Props): JSX.Element => {
  return <Wrapper>{props.children}</Wrapper>
}

export default DefaultPageLayout
