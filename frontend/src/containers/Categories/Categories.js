// libraries
import React from 'react'
import styled from 'styled-components'
import { withRouter, Route } from 'react-router-dom'
// components
import PageLayout from 'components/PageLayout/PageLayout'
import ContentBox from 'shared/ContentBox/ContentBox'
import CategoryOverview from 'components/CategoryOverview/CategoryOverview'
import CategoryEdit from 'components/CategoryEdit/CategoryEdit'
import CategoryCreate from 'components/CategoryCreate/CategoryCreate'

export const Layout = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 70px 1fr;
`

export default props => {
  const { isUserLoggedIn, rootPath, createNotificationBanner } = props
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
              rootPath={rootPath}
              createNotificationBanner={createNotificationBanner}
            />
          )}
        />
        <Route
          exact
          path={`${rootPath}/edit/:id`}
          render={() => (
            <CategoryEdit
              rootPath={rootPath}
              createNotificationBanner={createNotificationBanner}
            />
          )}
        />
      </ContentBox>
    </PageLayout>
  )
}
