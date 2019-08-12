// libraries
import React from 'react'
import styled from 'styled-components'
// helper
import { categoryColors } from 'params'
// components
import ContentSelect from 'shared/form/ContentSelect/ContentSelect'
// interfaces
import { SelectOption, InputEvent } from 'types/types'

const SmallColorPreview = styled.div`
  height: 1.5625rem;
  width: 1.5625rem;

  background-color: ${(props): string => props.theme.category[props.color]};
`

// Create select options based on theme colors.
const prepareOptions = (): SelectOption[] =>
  Object.keys(categoryColors).map(
    (key): SelectOption => {
      return { value: key, title: key }
    }
  )

interface Props {
  id?: string
  name: string
  onChange: (event: InputEvent) => void
  tabIndex: number
  required?: boolean
  value: string
}

const ColorSelect = (props: Props): JSX.Element => {
  const { value, onChange, name, tabIndex, id, required } = props
  const colors = prepareOptions() // will return an empty array, if there should be no colors
  return (
    <ContentSelect
      allowEmpty
      id={id}
      label="Farbe"
      name={name}
      onChange={onChange}
      options={colors}
      renderPreview={(option: SelectOption): JSX.Element => (
        <SmallColorPreview color={String(option.value)} />
      )}
      required={required}
      tabIndex={tabIndex}
      value={value}
    />
  )
}

export default ColorSelect
