// libraries
import * as React from 'react'
import { Element } from './styles'

interface Props { context?: string; children: string; }

const H1 = (props: Props) => <Element context={props.context}>{props.children}</Element>

export default H1
