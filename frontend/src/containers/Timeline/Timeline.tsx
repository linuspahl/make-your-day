// libraries
import * as React from 'react'
import { Route } from 'react-router-dom'
// components
import ContentBox from 'shared/ContentBox/ContentBox'
import DayEdit from 'components/DayEdit/DayEdit'
import PageLayout from 'components/PageLayout/PageLayout'
// interfaces
import { UserSession } from 'store/userSession/type'

interface Props {
  rootPath: string
  userSession: UserSession
}

const Timeline = (props: Props): React.ReactElement => {
  const { userSession, rootPath } = props
  return (
    <PageLayout userSession={userSession} rootPath={rootPath}>
      <ContentBox>
        <Route exact path={`${rootPath}/:date`} render={() => <DayEdit />} />
      </ContentBox>
    </PageLayout>
  )
}

export default Timeline
