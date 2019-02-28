// libraries
import React from 'react'
import styled, { keyframes } from 'styled-components'

const bounce = keyframes`
0%, 100% {
  transform: scale(0.0);
  -webkit-transform: scale(0.0);
} 50% {
  transform: scale(1.0);
  -webkit-transform: scale(1.0);
}
`

const Layout = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`

const Spinner = styled.div`
  width: 60px;
  height: 60px;

  position: relative;
  margin: 0 auto;
`

const DoubleBouncer1 = styled.div`
  width: 100%;
  height: 100%;

  top: 0;
  left: 0;
  position: absolute;

  border-radius: 50%;
  background-color: ${props => props.theme.border};
  opacity: 0.6;

  animation: ${bounce} 2s infinite ease-in-out;
`

const DoubleBouncer2 = styled(DoubleBouncer1)`
  animation-delay: -1s;
`

const CenteredSpinner = () => (
  <Layout>
    <Spinner>
      <DoubleBouncer1 />
      <DoubleBouncer2 />
    </Spinner>
  </Layout>
)

export default CenteredSpinner
