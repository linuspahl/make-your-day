// libraries
import React from 'react'
import { Route } from 'react-router-dom'
// components
import EvaluationOverview from 'components/EvaluationOverview/EvaluationOverview'
import EvaluationEdit from 'components/EvaluationEdit/EvaluationEdit'
import EvaluationResult from 'components/EvaluationResult/EvaluationResult'
import EvaluationCreate from 'components/EvaluationCreate/EvaluationCreate'
// interfaces
import { NotificationCreate } from 'types/types'

interface Props {
  createNotificationBanner: (notification: NotificationCreate) => void
  rootPath: string
}

const Evaluations = (props: Props): JSX.Element => {
  const { createNotificationBanner, rootPath } = props
  return (
    <React.Fragment>
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
        render={(): JSX.Element => (
          <EvaluationCreate
            createNotificationBanner={createNotificationBanner}
            rootPath={rootPath}
          />
        )}
      />
      <Route
        exact
        path={`${rootPath}/edit/:id`}
        public
        render={(): JSX.Element => (
          <EvaluationEdit
            createNotificationBanner={createNotificationBanner}
            rootPath={rootPath}
          />
        )}
      />
      <Route
        exact
        path={`${rootPath}/view/:id`}
        public
        render={(): JSX.Element => <EvaluationResult rootPath={rootPath} />}
      />
    </React.Fragment>
  )
}

export default Evaluations
