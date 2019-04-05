// libraries
import * as React from 'react'
import styled from 'styled-components'
// helper
import { categoryColors } from '../../../../config/params'
// components
import ContentSelect from 'shared/form/ContentSelect/ContentSelect'
// interfaces
import { SelectOption, InputEvent } from 'types/types'

const SmallColorPreview = styled.div`
  height: 25px;
  width: 25px;

  background-color: ${props => props.color};
`

// Create select options based on theme colors
const prepareOptions = (): SelectOption[] =>
  Object.keys(categoryColors).map(key => {
    return { value: key, title: key }
  })

interface Props {
  name: string
  onChange: (event: InputEvent) => void
  tabIndex: number
  value: string
}

const ColorSelect = (props: Props): React.ReactElement => {
  const { value, onChange, name, tabIndex } = props
  const colors = prepareOptions()

  return (
    <ContentSelect
      allowEmpty
      tabIndex={tabIndex}
      value={value}
      renderPreview={(option: SelectOption) => (
        <SmallColorPreview color={String(option.value)} />
      )}
      onChange={onChange}
      name={name}
      options={colors}
      title="Farbe"
    />
  )
}

export default ColorSelect
