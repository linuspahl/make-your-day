// libraries
import React from 'react'
import { Route } from 'react-router-dom'
// components
import DayEdit from 'components/DayEdit/DayEdit'

interface Props {
  rootPath: string
}

const Timeline = ({ rootPath }: Props): JSX.Element => (
  <Route
    exact
    path={`${rootPath}/:date`}
    render={(): JSX.Element => <DayEdit />}
  />
)

export default Timeline
