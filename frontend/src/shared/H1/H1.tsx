// libraries
import * as React from 'react'
import { Element } from './styles'
// interfaces
interface H1 { context: string; children: string; }

const H1 = (props: H1) => <Element context={props.context}>{props.children}</Element>

export default H1
