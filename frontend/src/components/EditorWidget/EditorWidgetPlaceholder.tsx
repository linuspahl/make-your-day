// libraries
import * as React from 'react'
import styled from 'styled-components'

const Element = styled.div`
  width: 100%;
  height: 100%;

  background-color: ${(props): string => props.theme.border};
`

const EditorWidgetPlaceholder = (): React.ReactElement => <Element />

export default EditorWidgetPlaceholder
