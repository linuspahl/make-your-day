// libraries
import React from 'react'
import styled from 'styled-components'
// helper
import { categoryColors } from '../../../../config/params'
// components
import ContentSelect from 'shared/form/ContentSelect/ContentSelect'

const SmallColorPreview = styled.div`
  height: 25px;
  width: 25px;

  background-color: ${props => props.color};
`
const prepareColors = colors => {
  // Make "no selection" selectable
  const noSelection = { value: null, title: 'Keine Auswahl' }
  // Create select options based on theme colors
  const colorsOptions = Object.keys(colors).map(key => {
    return { value: key, title: key }
  })
  colorsOptions.unshift(noSelection)
  return colorsOptions
}

const ColorSelect = props => {
  const { value, onChange, name, tabIndex } = props
  const colors = prepareColors(categoryColors)

  return (
    <ContentSelect
      tabIndex={tabIndex}
      value={value}
      renderPreview={option => <SmallColorPreview color={option.value} />}
      onChange={onChange}
      name={name}
      options={colors}
      title="Farbe"
    />
  )
}

export default ColorSelect
