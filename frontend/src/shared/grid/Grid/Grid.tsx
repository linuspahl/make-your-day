// libraries
import React from 'react'

interface Props {
  children: React.ReactNode
}

const Grid = ({ children }: Props): JSX.Element => <div>{children}</div>

export default Grid
