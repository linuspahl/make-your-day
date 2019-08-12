// libraries
import React from 'react'

interface Props {
  children: React.ReactNode
}

const Grid = (props: Props): JSX.Element => <div>{props.children}</div>

export default Grid
