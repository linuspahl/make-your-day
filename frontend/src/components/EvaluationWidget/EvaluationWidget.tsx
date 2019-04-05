// libraries
import * as React from 'react'
import styled from 'styled-components'
// components
import EvaluationChart from 'components/EvaluationChart/EvaluationChart'
import H1 from 'shared/H1/H1'
// interfaces
import { Evaluation } from 'store/evaluation/type'

const Layout = styled.div`
  width: 100%;
  height: 100%;

  // If the display: flex prop gets unnecessary,
  // you can delete the wrapping div of this components.
  // See the comment in the render part
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 20px;
  border: 1px solid ${props => props.theme.border};
  border-radius: 0;

  background-color: ${props => props.theme.contentBoxBg};

  canvas {
    max-width: 100%;
  }
`

interface Props {
  evaluation: Evaluation
}

export default class EvaluationWidget extends React.Component<Props> {
  public render(): React.ReactElement {
    const { evaluation } = this.props

    // The wrapping div is only needed, because the Layout Component would ignore it's parents padding,
    // due to the `display: flex` styling
    return (
      <div>
        <Layout>
          <H1 context="page">{evaluation.title}</H1>
          <EvaluationChart evaluation={evaluation} />
        </Layout>
      </div>
    )
  }
}
