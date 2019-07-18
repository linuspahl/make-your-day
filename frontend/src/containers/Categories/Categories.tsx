// libraries
import * as React from 'react'
import { Route } from 'react-router-dom'
// components
import PageLayout from 'components/PageLayout/PageLayout'
import CategoryOverview from 'components/CategoryOverview/CategoryOverview'
import CategoryEdit from 'components/CategoryEdit/CategoryEdit'
import CategoryCreate from 'components/CategoryCreate/CategoryCreate'
import RecordCreate from 'components/RecordCreate/RecordCreate'
import RecordEdit from 'components/RecordEdit/RecordEdit'
import SubcategoryOverview from 'components/SubcategoryOverview/SubcategoryOverview'
import SubcategoryCreate from 'components/SubcategoryCreate/SubcategoryCreate'
import SubcategoryEdit from 'components/SubcategoryEdit/SubcategoryEdit'
// interfaces
import { UserSession } from 'store/userSession/type'
import { NotificationCreate } from 'types/types'

interface Props {
  createNotificationBanner: (notification: NotificationCreate) => void
  rootPath: string
  userSession: UserSession
}

const Categories = (props: Props): JSX.Element => {
  const { createNotificationBanner, userSession, rootPath } = props
  return (
    <PageLayout userSession={userSession} rootPath={rootPath}>
      <Route
        exact
        path={rootPath}
        render={(): JSX.Element => <CategoryOverview rootPath={rootPath} />}
      />
      <Route
        exact
        path={`${rootPath}/create`}
        render={(): JSX.Element => (
          <CategoryCreate
            createNotificationBanner={createNotificationBanner}
            rootPath={rootPath}
          />
        )}
      />
      <Route
        exact
        path={`${rootPath}/edit/:id`}
        render={(): JSX.Element => (
          <CategoryEdit
            createNotificationBanner={createNotificationBanner}
            rootPath={rootPath}
          />
        )}
      />
      <Route
        exact
        path={`${rootPath}/:categoryId/records/create`}
        render={(): JSX.Element => (
          <RecordCreate createNotificationBanner={createNotificationBanner} />
        )}
      />
      <Route
        exact
        path={`${rootPath}/:categoryId/records/:id/edit`}
        render={(): JSX.Element => (
          <RecordEdit createNotificationBanner={createNotificationBanner} />
        )}
      />
      <Route
        exact
        path={`${rootPath}/:id/subcategories`}
        render={(): JSX.Element => <SubcategoryOverview rootPath={rootPath} />}
      />
      <Route
        exact
        path={`${rootPath}/:id/subcategories/create`}
        render={(): JSX.Element => (
          <SubcategoryCreate
            createNotificationBanner={createNotificationBanner}
            rootPath={rootPath}
          />
        )}
      />
      <Route
        exact
        path={`${rootPath}/:categoryId/subcategories/:id/edit`}
        render={(): JSX.Element => (
          <SubcategoryEdit
            createNotificationBanner={createNotificationBanner}
            rootPath={rootPath}
          />
        )}
      />
    </PageLayout>
  )
}

export default Categories
