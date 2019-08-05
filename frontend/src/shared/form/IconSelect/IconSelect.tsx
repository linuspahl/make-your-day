// libraries
import * as React from 'react'
// components
import ContentSelect from 'shared/form/ContentSelect/ContentSelect'
import Icon from 'shared/Icon/Icon'
// interfaces
import { InputEvent } from 'types/types'

import { categoryIcons } from 'params'

interface Props {
  disabled?: boolean
  id?: string
  name: string
  onChange: (event: InputEvent) => void
  tabIndex: number
  value: string
}

const IconSelect = (props: Props): JSX.Element => {
  const { value, onChange, name, tabIndex, disabled, id } = props

  return (
    <ContentSelect
      allowEmpty
      disabled={disabled}
      id={id}
      label="Icon"
      name={name}
      onChange={onChange}
      options={categoryIcons}
      renderPreview={(option): JSX.Element => (
        <Icon title={String(option.value)} />
      )}
      tabIndex={tabIndex}
      value={value}
    />
  )
}

export default IconSelect
