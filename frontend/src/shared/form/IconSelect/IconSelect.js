// libraries
import React from 'react'
// components
import ContentSelect from 'shared/form/ContentSelect/ContentSelect'
import Icon from 'shared/Icon/Icon'

import { categoryIcons } from '../../../config/params'

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
      options={categoryIcons}
      title="Icon"
    />
  )
}
