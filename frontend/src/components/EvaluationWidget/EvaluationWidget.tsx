// libraries
import React from 'react'
import styled from 'styled-components'
// components
import EvaluationChart from 'components/EvaluationChart/EvaluationChart'

// interfaces
import { Evaluation } from 'store/evaluation/type'

const Outer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: ${(props): string => `${props.theme.padding}rem`};

  overflow-y: auto;
`

const Layout = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;

  /* Workaroung to prevent horizontal scrolling,
  if chart stops resizing on small screens */
  canvas {
    max-width: 100%;
  }
`

interface Props {
  evaluation: Evaluation
}

export default class EvaluationWidget extends React.Component<Props> {
  public render(): JSX.Element {
    const { evaluation } = this.props

    return (
      <Outer>
        <Layout>
          <EvaluationChart evaluation={evaluation} />
        </Layout>
      </Outer>
    )
  }
}
