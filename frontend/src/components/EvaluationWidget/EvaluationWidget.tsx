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

    return (
      <Layout>
        <H1 context="page">{evaluation.title}</H1>
        <EvaluationChart evaluation={evaluation} />
      </Layout>
    )
  }
}
