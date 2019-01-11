// libraries
import React from 'react'
// components
import ContentSelect from 'shared/form/ContentSelect/ContentSelect'
import Icon from 'shared/Icon/Icon'

const icons = [
  { value: null, title: '-' },
  { value: 'glass', title: 'Glass' },
  { value: 'car', title: 'Auto' },
  { value: 'archive', title: 'Box' },
  { value: 'at', title: '@' },
  { value: 'check', title: 'Checkmark' },
  { value: 'book', title: 'Buch' },
  { value: 'gift', title: 'Geschenk' },
  { value: 'bicycle', title: 'Fahrrad' },
  { value: 'cutlery', title: 'Messer und Gabel' },
]

export default props => {
  const { value, toggleSelect, onChange, name, tabIndex } = props

  return (
    <ContentSelect
      tabIndex={tabIndex}
      value={value}
      renderPreview={option => <Icon title={option.value} />}
      toggleSelect={toggleSelect}
      onChange={onChange}
      name={name}
      options={icons}
    />
  )
}
