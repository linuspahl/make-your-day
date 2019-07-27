// libraries
import * as React from 'react'
import { Route } from 'react-router-dom'
// components
import DayEdit from 'components/DayEdit/DayEdit'

interface Props {
  rootPath: string
}

const Timeline = (props: Props): JSX.Element => {
  const { rootPath } = props
  return (
    <Route
      exact
      path={`${rootPath}/:date`}
      render={(): JSX.Element => <DayEdit />}
    />
  )
}

export default Timeline
