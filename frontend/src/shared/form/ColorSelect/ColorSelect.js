// libraries
import React from 'react'
import styled from 'styled-components'
// helper
import theme from '../../../../config/theme'
// components
import ContentSelect from 'shared/form/ContentSelect/ContentSelect'

const SmallColorPreview = styled.div`
  height: 25px;
  width: 25px;

  background-color: ${props => props.color};
`
const prepareColors = colors => {
  // Make "no selection" selectable
  const noSelection = { value: null, title: '-' }
  // Create select options based on theme colors
  const colorsOptions = Object.keys(colors).map(key => {
    return { value: key, title: key }
  })
  colorsOptions.unshift(noSelection)
  return colorsOptions
}

export default props => {
  const { value, toggleSelect, onChange, name, tabIndex } = props
  const colors = prepareColors(theme.category)

  return (
    <ContentSelect
      tabIndex={tabIndex}
      value={value}
      renderPreview={option => <SmallColorPreview color={option.value} />}
      toggleSelect={toggleSelect}
      onChange={onChange}
      name={name}
      options={colors}
    />
  )
}
