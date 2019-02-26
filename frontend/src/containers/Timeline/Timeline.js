// libraries
import React from 'react'
import { Route } from 'react-router-dom'
// components
import ContentBox from 'shared/ContentBox/ContentBox'
import DayEdit from 'components/DayEdit/DayEdit'
import PageLayout from 'components/PageLayout/PageLayout'

export default props => {
  const { userSession, rootPath } = props
  return (
    <PageLayout userSession={userSession} rootPath={rootPath}>
      <ContentBox>
        <Route
          exact
          path={`${rootPath}/:date`}
          render={() => <DayEdit rootPath={rootPath} />}
        />
      </ContentBox>
    </PageLayout>
  )
}
