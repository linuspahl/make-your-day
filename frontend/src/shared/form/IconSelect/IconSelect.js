// libraries
import React from 'react'
// components
import ContentSelect from 'shared/form/ContentSelect/ContentSelect'
import Icon from 'shared/Icon/Icon'

import { categoryIcons } from '../../../../config/params'

const IconSelect = props => {
  const { value, toggleSelect, onChange, name, tabIndex } = props

  return (
    <ContentSelect
      name={name}
      onChange={onChange}
      options={categoryIcons}
      renderPreview={option => <Icon title={option.value} />}
      tabIndex={tabIndex}
      title="Icon"
      toggleSelect={toggleSelect}
      value={value}
    />
  )
}

export default IconSelect
