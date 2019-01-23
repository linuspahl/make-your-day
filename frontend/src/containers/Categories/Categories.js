// libraries
import React from 'react'
import { Route } from 'react-router-dom'
// components
import PageLayout from 'components/PageLayout/PageLayout'
import ContentBox from 'shared/ContentBox/ContentBox'
import CategoryOverview from 'components/CategoryOverview/CategoryOverview'
import CategoryEdit from 'components/CategoryEdit/CategoryEdit'
import CategoryCreate from 'components/CategoryCreate/CategoryCreate'
import RecordCreate from 'components/RecordCreate/RecordCreate'

export default props => {
  const { createNotificationBanner, isUserLoggedIn, rootPath } = props
  return (
    <PageLayout isUserLoggedIn={isUserLoggedIn} rootPath={rootPath}>
      <ContentBox>
        <Route
          exact
          path={rootPath}
          render={() => <CategoryOverview rootPath={rootPath} />}
        />
        <Route
          exact
          path={`${rootPath}/create`}
          render={() => (
            <CategoryCreate
              createNotificationBanner={createNotificationBanner}
              rootPath={rootPath}
            />
          )}
        />
        <Route
          exact
          path={`${rootPath}/edit/:id`}
          render={() => (
            <CategoryEdit
              createNotificationBanner={createNotificationBanner}
              rootPath={rootPath}
            />
          )}
        />
        <Route
          exact
          path={`${rootPath}/:categoryId/records/create`}
          render={() => (
            <RecordCreate createNotificationBanner={createNotificationBanner} />
          )}
        />
      </ContentBox>
    </PageLayout>
  )
}
