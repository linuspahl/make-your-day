// libraries
import React from 'react'
import { Route } from 'react-router-dom'
// components
import EvaluationOverview from 'components/EvaluationOverview/EvaluationOverview'
import EvaluationEdit from 'components/EvaluationEdit/EvaluationEdit'
import EvaluationResult from 'components/EvaluationResult/EvaluationResult'
import EvaluationCreate from 'components/EvaluationCreate/EvaluationCreate'

interface Props {
  rootPath: string
}

const Evaluations = ({ rootPath }: Props): JSX.Element => (
  <>
    <Route
      exact
      path={rootPath}
      public
      render={(): JSX.Element => <EvaluationOverview rootPath={rootPath} />}
    />
    <Route
      exact
      path={`${rootPath}/create`}
      public
      render={(): JSX.Element => <EvaluationCreate rootPath={rootPath} />}
    />
    <Route
      exact
      path={`${rootPath}/edit/:id`}
      public
      render={(): JSX.Element => <EvaluationEdit rootPath={rootPath} />}
    />
    <Route
      exact
      path={`${rootPath}/view/:id`}
      public
      render={(): JSX.Element => <EvaluationResult rootPath={rootPath} />}
    />
  </>
)

export default Evaluations
