// libraries
import * as React from 'react'
import { Route } from 'react-router-dom'
// components
import DayEdit from 'components/DayEdit/DayEdit'
import PageLayout from 'components/PageLayout/PageLayout'
// interfaces
import { UserSession } from 'store/userSession/type'

interface Props {
  rootPath: string
  userSession: UserSession
}

const Timeline = (props: Props): JSX.Element => {
  const { userSession, rootPath } = props
  return (
    <PageLayout userSession={userSession} rootPath={rootPath}>
      <Route
        exact
        path={`${rootPath}/:date`}
        render={(): JSX.Element => <DayEdit />}
      />
    </PageLayout>
  )
}

export default Timeline
