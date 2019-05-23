// libraries
import * as React from 'react'
import { Route } from 'react-router-dom'
// components
import PageLayout from 'components/PageLayout/PageLayout'
import ContentBox from 'shared/ContentBox/ContentBox'
import CategoryOverview from 'components/CategoryOverview/CategoryOverview'
import CategoryEdit from 'components/CategoryEdit/CategoryEdit'
import CategoryCreate from 'components/CategoryCreate/CategoryCreate'
import RecordCreate from 'components/RecordCreate/RecordCreate'
import RecordUpdate from 'components/RecordUpdate/RecordEdit'
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

const Categories = (props: Props): React.ReactElement => {
  const { createNotificationBanner, userSession, rootPath } = props
  return (
    <PageLayout userSession={userSession} rootPath={rootPath}>
      <ContentBox role="main">
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
        <Route
          exact
          path={`${rootPath}/:categoryId/records/:id/edit`}
          render={() => (
            <RecordUpdate createNotificationBanner={createNotificationBanner} />
          )}
        />
        <Route
          exact
          path={`${rootPath}/:id/subcategories`}
          render={() => <SubcategoryOverview rootPath={rootPath} />}
        />
        <Route
          exact
          path={`${rootPath}/:id/subcategories/create`}
          render={() => (
            <SubcategoryCreate
              createNotificationBanner={createNotificationBanner}
              rootPath={rootPath}
            />
          )}
        />
        <Route
          exact
          path={`${rootPath}/:categoryId/subcategories/:id/edit`}
          render={() => (
            <SubcategoryEdit
              createNotificationBanner={createNotificationBanner}
              rootPath={rootPath}
            />
          )}
        />
      </ContentBox>
    </PageLayout>
  )
}

export default Categories
