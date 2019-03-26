// libraries
import * as React from 'react'
import styled from 'styled-components'
// helper
import { categoryColors } from '../../../../config/params'
// components
import ContentSelect from 'shared/form/ContentSelect/ContentSelect'
// interfaces
import { SelectOption, InputEvent } from 'src/types/types'

const SmallColorPreview = styled.div`
  height: 25px;
  width: 25px;

  background-color: ${props => props.color};
`
const prepareOptions = () => {
  // Make "no selection" selectable
  const noSelection: SelectOption = { value: null, title: 'Keine Auswahl' }
  // Create select options based on theme colors
  const colorsOptions: Array<SelectOption> = Object.keys(categoryColors).map(key => {
    return { value: key, title: key }
  })
  colorsOptions.unshift(noSelection)
  return colorsOptions
}

interface Props {
 name: string
 onChange: (event: InputEvent) => void
 tabIndex: number
 value: string
}

const ColorSelect = (props: Props) => {
  const { value, onChange, name, tabIndex } = props
  const colors = prepareOptions()

  return (
    <ContentSelect
      tabIndex={tabIndex}
      value={value}
      renderPreview={(option: SelectOption) => <SmallColorPreview color={String(option.value)} />}
      onChange={onChange}
      name={name}
      options={colors}
      title="Farbe"
    />
  )
}

export default ColorSelect
