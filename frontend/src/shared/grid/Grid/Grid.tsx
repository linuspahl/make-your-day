// libraries
import * as React from 'react'

interface Props {
  children: React.ReactNode
}

const Grid = (props: Props): React.ReactElement => <div>{props.children}</div>

export default Grid
