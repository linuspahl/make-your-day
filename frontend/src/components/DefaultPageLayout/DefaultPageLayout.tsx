// libraries
import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  min-height: 100%;

  padding: ${(props): string => {
    const {
      theme: {
        heights: { bottomMenu },
        padding,
      },
    } = props
    return `${padding}rem ${padding}rem ${padding +
      bottomMenu / 4}rem ${padding}rem`
  }};

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

const DefaultPageLayout = ({ children }: Props): JSX.Element => (
  <Wrapper>{children}</Wrapper>
)

export default DefaultPageLayout
