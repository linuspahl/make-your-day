// libraries
import React from 'react'
import { Route } from 'react-router-dom'
// components
import PageLayout from 'components/PageLayout/PageLayout'
import ContentBox from 'shared/ContentBox/ContentBox'
import EvaluationOverview from 'components/EvaluationOverview/EvaluationOverview'
import EvaluationEdit from 'components/EvaluationEdit/EvaluationEdit'
import EvaluationResult from 'components/EvaluationResult/EvaluationResult'
import EvaluationCreate from 'components/EvaluationCreate/EvaluationCreate'

const Evaluations = props => {
  const { createNotificationBanner, userSession, rootPath } = props
  return (
    <PageLayout userSession={userSession} rootPath={rootPath}>
      <ContentBox>
        <Route
          exact
          path={rootPath}
          render={() => <EvaluationOverview rootPath={rootPath} />}
        />
        <Route
          exact
          path={`${rootPath}/create`}
          render={() => (
            <EvaluationCreate
              createNotificationBanner={createNotificationBanner}
              rootPath={rootPath}
            />
          )}
        />
        <Route
          exact
          path={`${rootPath}/edit/:id`}
          render={() => (
            <EvaluationEdit
              createNotificationBanner={createNotificationBanner}
              rootPath={rootPath}
            />
          )}
        />
        <Route
          exact
          path={`${rootPath}/view/:id`}
          render={() => (
            <EvaluationResult
              createNotificationBanner={createNotificationBanner}
              rootPath={rootPath}
            />
          )}
        />
      </ContentBox>
    </PageLayout>
  )
}

export default Evaluations
