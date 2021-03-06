// libraries
import React from 'react'
import { Route } from 'react-router-dom'
// components
import CategoryOverview from 'components/CategoryOverview/CategoryOverview'
import CategoryEdit from 'components/CategoryEdit/CategoryEdit'
import CategoryCreate from 'components/CategoryCreate/CategoryCreate'
import RecordCreate from 'components/RecordCreate/RecordCreate'
import RecordEdit from 'components/RecordEdit/RecordEdit'
import SubcategoryOverview from 'components/SubcategoryOverview/SubcategoryOverview'
import SubcategoryCreate from 'components/SubcategoryCreate/SubcategoryCreate'
import SubcategoryEdit from 'components/SubcategoryEdit/SubcategoryEdit'

interface Props {
  rootPath: string
}

const Categories = ({ rootPath }: Props): JSX.Element => (
  <>
    <Route
      exact
      path={rootPath}
      render={(): JSX.Element => <CategoryOverview rootPath={rootPath} />}
    />
    <Route
      exact
      path={`${rootPath}/create`}
      render={(): JSX.Element => <CategoryCreate rootPath={rootPath} />}
    />
    <Route
      exact
      path={`${rootPath}/edit/:id`}
      render={(): JSX.Element => <CategoryEdit rootPath={rootPath} />}
    />
    <Route
      exact
      path={`${rootPath}/:categoryId/records/create`}
      render={(): JSX.Element => <RecordCreate />}
    />
    <Route
      exact
      path={`${rootPath}/:categoryId/records/:id/edit`}
      render={(): JSX.Element => <RecordEdit />}
    />
    <Route
      exact
      path={`${rootPath}/:id/subcategories`}
      render={(): JSX.Element => <SubcategoryOverview rootPath={rootPath} />}
    />
    <Route
      exact
      path={`${rootPath}/:id/subcategories/create`}
      render={(): JSX.Element => <SubcategoryCreate rootPath={rootPath} />}
    />
    <Route
      exact
      path={`${rootPath}/:categoryId/subcategories/:id/edit`}
      render={(): JSX.Element => <SubcategoryEdit rootPath={rootPath} />}
    />
  </>
)

export default Categories
