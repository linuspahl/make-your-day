// libraries
import React from 'react'
import { Route } from 'react-router-dom'
// components
import ContentBox from 'shared/ContentBox/ContentBox'
import DayEdit from 'components/DayEdit/DayEdit'
import PageLayout from 'components/PageLayout/PageLayout'

export default props => {
  const { isUserLoggedIn, rootPath } = props
  return (
    <PageLayout isUserLoggedIn={isUserLoggedIn} rootPath={rootPath}>
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