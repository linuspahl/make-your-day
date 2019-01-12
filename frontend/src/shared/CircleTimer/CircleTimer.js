import React from 'react'
import { Layout, SvgWrapper, SvgCircle } from './styles'

export default props => {
  const hasClickAction = typeof props.clickAction
  return (
    <Layout onClick={() => hasClickAction && props.clickAction()}>
      {props.children}
      <SvgWrapper>
        <SvgCircle r="18" cx="20" cy="20" />
      </SvgWrapper>
    </Layout>
  )
}
